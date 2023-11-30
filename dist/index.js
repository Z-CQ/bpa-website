// <img width="24" class="card-icon" src="imgs/logos/visa.png">

var prices = {
    "grilled-steak": 4.99,
    "grilled-chicken": 6.49,
    "grilled-pork": 3.99,
    "grilled-kebabs": 2.99,
    "burgers": 3.99,
    "seared-steak": 7.99,
    "broccoli-chicken": 12.99,
    "sliced-pork-roast": 14.99,
    "catering-burgers": 7.99,
    "catering-bbq": 12.99,
    "katering-kebabs": 6.99
};
let cart = [];

if(document.cookie.includes("cart="))
    loadCart();

function isNumber(s) {
    return /^-?\d+$/.test(s);
}

function getTotal() {
    let total = 0;
    cart.forEach(item => {
        let price = Object.values(item)[0];
        total += price;
    })
    return total;
}

function saveCart() {
    let newCart = [];
    cart.forEach(e => {
        let stringedObj = JSON.stringify(e);
        newCart.push(stringedObj);
    });
    document.cookie = "cart=" + newCart.toString();
}

function loadCart() {
    let stringedArray = document.cookie.split("=")[1];
    let newCart = [];
    stringedArray.split(",").forEach(i => {
        newCart.push(JSON.parse(i));
    });
    cart = newCart;
}

for(let i = 0; i < document.getElementsByClassName("button").length; i++) {
    let e = document.getElementsByClassName("button").item(i);
    e.addEventListener("click", ()=>{
        let id = e.id;
        let price = prices[id];
        let item = {};
        let qty = 1;
        item[id] = price * qty;
        cart.push(item);
        console.log(cart);
        console.log("New Total: $" + getTotal());
        saveCart();
    });
}

document.getElementById("CCNum").addEventListener("input", () =>{
    let content = document.getElementById("CCNum").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last) || content.length >= 19) {
        document.getElementById("CCNum").value = content.substring(0, content.length - 1)
    }
    if(content.length != 0) {
        if(content.includes("-")) {
            if(content.length % 5 == 0) {
                document.getElementById("CCNum").value = content + '-';
            }
        } else {
            if(content.length % 4 == 0) {
                document.getElementById("CCNum").value = content + '-';
            }
        }
    }
});

document.getElementById("ExMonth").addEventListener("input", () =>{
    let content = document.getElementById("ExMonth").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last)) {
        document.getElementById("ExMonth").value = content.substring(0, content.length - 1)
    }
});

document.getElementById("Ccv").addEventListener("input", () =>{
    let content = document.getElementById("Ccv").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last)) {
        document.getElementById("Ccv").value = content.substring(0, content.length - 1)
    }
});

document.getElementById("fphone").addEventListener("input", () =>{
    let content = document.getElementById("fphone").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last)) {
        document.getElementById("fphone").value = content.substring(0, content.length - 1)
    }
});