const nameV = document.getElementById("name");
const emailV = document.getElementById("email");
const phoneV = document.getElementById("phone");
const dateV = document.getElementById("date");
const timeV = document.getElementById("time");
const peopleV = document.getElementById("people");
const msg = document.getElementById("msg");


function sendData() {

    fetch("http://localhost:8080/addBook", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: nameV.value,
                email: emailV.value,
                phone: phoneV.value,
                date: dateV.value,
                time: timeV.value,
                people: peopleV.value,
                message: msg.value
            })
        })
        .then((response) => {
            alert("Success");
            console.logO(response);


        });

    nameV.value = ""
    emailV.value = ""
    phoneV.value = ""
    dateV.value = ""
    timeV.value = ""
    peopleV.value = ""
    msg.value = ""

}


function addMenu() {


    const menu_list = document.getElementById('menu-item-list');

    const menu_item_images = ["assets/img/menu/menu-item-1.png", "assets/img/menu/menu-item-2.png", "assets/img/menu/menu-item-3.png", "assets/img/menu/menu-item-4.png"];

    const menu_target = ['#menu-starters', '#menu-breakfast', '#menu-lunch', '#menu-dinner'];

    fetch('http://127.0.0.1:8080/menuStarters')
        .then((response) => response.json())
        .then((data) => {
            var count = 0;
            data.Sheet1.forEach(item => {
                var original_content = `
                    <a href="${menu_item_images[count]}" class="glightbox"><img src="${menu_item_images[count]}" class="menu-img img-fluid" alt=""></a>
                    <h4>title</h4>
                    <p class="ingredients">
                        desc
                    </p>
                    <p class="price">price_t</p>
                `

                var content = original_content;
                // content = content.replace('item_img', menu_item_images[index]);
                content = content.replace('title', item.A);
                content = content.replace('desc', item.B);
                content = content.replace('price_t', item.C + "$");

                const menu_item = document.createElement('div');
                menu_item.innerHTML = content;
                menu_item.className = "col-lg-4 menu-item";
                menu_list.appendChild(menu_item);

                count++;
            })
        });

    //     for (let index = 0; index < menu_item_images.length; index++) {

    //         var original_content = `
    //     <a href="${menu_item_images[index]}" class="glightbox"><img src="${menu_item_images[index]}" class="menu-img img-fluid" alt=""></a>
    //     <h4>Magnam Tiste</h4>
    //     <p class="ingredients">
    //         Lorem, deren, trataro, filede, nerada
    //     </p>
    //     <p class="price">price_t</p>
    //    `
    //         var content = original_content;
    //         // content = content.replace('item_img', menu_item_images[index]);
    //         content = content.replace('price_t', prices[index] + "$");

    //         const menu_item = document.createElement('div');
    //         menu_item.innerHTML = content;
    //         menu_item.className = "col-lg-4 menu-item";
    //         menu_list.appendChild(menu_item);
    //     }

}

function fillGalery() {

    const gallery = document.getElementById("gall");

    fetch('http://127.0.0.1:8080/gallery')
        .then((response) => response.json())
        .then((data) => {

            data.Sheet1.forEach(item => {

                var original_content = `
               <a class="glightbox" data-gallery="images-gallery" href="${item.A}"><img src="${item.A}" class="img-fluid" alt=""></a>
                  `

                const img = document.createElement('div');
                img.className = "swiper-slide";
                img.innerHTML = original_content;
                gallery.appendChild(img);


            })
        });
}


addMenu();

fillGalery();