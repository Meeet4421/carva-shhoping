const productlist = [
    {
        "product-id": 1,
        "product-name": "Cartoon Astronaut T-shirts",
        "product-img": "./images/products/f1.jpg",
        "product-price": "$78"
    },
    {
        "product-id": 2,
        "product-name": "Cartoon Astronaut shirts",
        "product-img": "./images/products/f2.jpg",
        "product-price": "$80"
    },
    {
        "product-id": 3,
        "product-name": "Baggy shirts",
        "product-img": "./images/products/f3.jpg",
        "product-price": "$90"
    },
    {
        "product-id": 4,
        "product-name": "Floral Shirts",
        "product-img": "./images/products/f4.jpg",
        "product-price": "$85"
    },
    {
        "product-id": 5,
        "product-name": "Designer T-shirts",
        "product-img": "./images/products/f5.jpg",
        "product-price": "$99"
    },
    {
        "product-id": 6,
        "product-name": "Jacket Combo T-shirts",
        "product-img": "./images/products/f6.jpg",
        "product-price": "$150"
    },
    {
        "product-id": 7,
        "product-name": "Cartoon Astronaut Pents",
        "product-img": "./images/products/f7.jpg",
        "product-price": "$80"
    },
    {
        "product-id": 8,
        "product-name": "Nack-Less T-shirts",
        "product-img": "./images/products/f8.jpg",
        "product-price": "$108"
    },
    {
        "product-id": 9,
        "product-name": "Cotton-shirt",
        "product-img": "./images/products/n1.jpg",
        "product-price": "$80"
    },
    {
        "product-id": 10,
        "product-name": "Cotton-shirt",
        "product-img": "./images/products/n2.jpg",
        "product-price": "$98"
    },
    {
        "product-id": 11,
        "product-name": "White shirts",
        "product-img": "./images/products/n3.jpg",
        "product-price": "$90"
    },
    {
        "product-id": 12,
        "product-name": "Lycra Shirt",
        "product-img": "./images/products/n4.jpg",
        "product-price": "$98"
    },
    {
        "product-id": 13,
        "product-name": "Denim Shirt",
        "product-img": "./images/products/n5.jpg",
        "product-price": "$99"
    },
    {
        "product-id": 14,
        "product-name": "Cotton Pents",
        "product-img": "./images/products/n6.jpg",
        "product-price": "$150"
    },
    {
        "product-id": 15,
        "product-name": "Denim Shirts",
        "product-img": "./images/products/n7.jpg",
        "product-price": "$350"
    },
    {
        "product-id": 16,
        "product-name": "Stylish Baggy Shirt",
        "product-img": "./images/products/n8.jpg",
        "product-price": "$780"
    }
];

console.log(productlist);

function productcard() {
    let maincontainers = document.querySelectorAll("#product1 .main-container");
    if (maincontainers.length > 0) {
        maincontainers.forEach(maincontainer => {
            productlist.forEach(data => {
                let mainbox = document.createElement("div");
                mainbox.classList.add("main-box");
                mainbox.innerHTML = `<img src="${data["product-img"]}" alt="" />
                <div class="des">
                  <span>Zara</span>
                  <h5>${data["product-name"]}</h5>
                  <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <h4>${data["product-price"]}</h4>
                </div>
                <a href="sproduct.html?id=${data['product-id']}"><i class="fal fa-shopping-cart s-cart"></i></a>`;

                maincontainer.appendChild(mainbox);
            });
        });
    } else {
        console.error("Main container not found");
    }

}

document.addEventListener("DOMContentLoaded", productcard);


let bar = document.getElementById("bar");
let clse = document.getElementById("close");
let nav = document.getElementsByClassName("navbar");
let active = document.getElementsByClassName("active");
let body = document.querySelector("body");

if (bar) {
    bar.addEventListener("click", () => {
        nav[0].classList.add("active");
        nav[0].style.display = "flex";
    })
}

if (clse) {
    clse.addEventListener("click", () => {
        nav[0].classList.remove("active")
        nav[0].style.display = "none";
    })
}

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("this is an event", e)
    function hidenav() {
        if (nav[0]) {
            nav[0].style.display = "none";

        }
    }
    body.addEventListener("touchstart", hidenav);

    nav[0].addEventListener('touchstart', (event) => {
        event.stopPropagation();
        nav[0].style.display = "flex";
    })

})




function changepic() {
    let multimg = document.getElementById("main-img")
    let singleimg = document.getElementsByClassName("small-img")

    for (let i = 0; i < singleimg.length; i++) {
        singleimg[i].addEventListener("click", () => {
            multimg.src = singleimg[i].src;
        })
    }
}

changepic()

document.addEventListener("DOMContentLoaded", function () {
    function addtocart() {
        let cartItems = document.querySelectorAll("#product1 .main-container .main-box");

        cartItems.forEach(item => {
            let iconItems = item.querySelectorAll("a i");
            let imgSrc = item.querySelector("img").src;
            let name = item.querySelector("h5").innerText;
            let price = item.querySelector("h4").innerText;

            iconItems.forEach(icon => {
                icon.addEventListener("click", event => {
                    event.preventDefault();

                    let product = { imgSrc, name, price };
                    //first cart is an key it retrive data from the localstorage and intlizzed data in to the 
                    //empty array 
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    //it push data in to the cart
                    cart.push(product);
                    //it set data in to local storage
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Product added to cart!');

                    loadcart();
                });
            });
        });
    }

    function loadcart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartbody = document.getElementById('cart-body');
        cartbody.innerHTML = ''; // Clear previous cart content
        let total = 0;

        cart.forEach(product => {
            let newrow = document.createElement("tr");

            let priceval = parseFloat(product.price.replace('$', ''));

            newrow.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${product.imgSrc}" alt=""></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><input class="qty" type="number" value="1" min="1" /></td>
                <td class="subtotal">${product.price}</td>
            `;

            cartbody.appendChild(newrow);

            total += priceval;
            newrow.querySelector('.subtotal').innerText = '$' + priceval.toFixed(2);

            newrow.querySelector('.qty').addEventListener('input', function () {
                let quantity = parseFloat(this.value);
                let subtotal = priceval * quantity;
                newrow.querySelector('.subtotal').innerText = '$' + subtotal.toFixed(2);

                let newTotal = 0;
                document.querySelectorAll('.subtotal').forEach(subtotalCell => {
                    newTotal += parseFloat(subtotalCell.innerText.replace('$', ''));
                });
                document.querySelectorAll('.maintotal').forEach(totalCell => {
                    totalCell.innerText = '$' + newTotal.toFixed(2);
                });
            });

            newrow.querySelector('.far.fa-times-circle').addEventListener('click', function (e) {
                e.preventDefault();
                let newCart = cart.filter(item => item.name !== product.name);
                localStorage.setItem('cart', JSON.stringify(newCart));
                loadcart(); // Refresh the cart display after removal
            });
        });

        document.querySelectorAll('.maintotal').forEach(totalCell => {
            totalCell.innerText = '$' + total.toFixed(2);
        });
    }

    addtocart();
    loadcart();
});



