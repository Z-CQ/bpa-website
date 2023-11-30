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