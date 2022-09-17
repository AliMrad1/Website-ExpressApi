var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
var XLSX = require("xlsx");

var app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/addBook', function(req, res) {


    const data = req.body;
    console.log(data);
    const workbook = XLSX.readFile("Book.xlsx");

    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n");

    worksheets.Sheet1.push(
        data
    );

    XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
    XLSX.writeFile(workbook, "Book.xlsx");

    res.send('You sent the name "' + req.body.name + '".');
});

app.get('/menuStarters', (req, res) => {
    const result = excelToJson({
        source: fs.readFileSync('data.xlsx') // fs.readFileSync return a Buffer
    });

    console.log(result);
    res.send(result);
})

app.get('/gallery', (req, res) => {
    const result = excelToJson({
        source: fs.readFileSync('images.xlsx') // fs.readFileSync return a Buffer
    });

    console.log(result);
    res.send(result);
})

app.listen(8080, function() {
    console.log('Server running at http://127.0.0.1:8080/');
});