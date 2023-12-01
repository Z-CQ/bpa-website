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
    "catering-kebabs": 6.99
};
let cart = [];


if(document.cookie.includes("cart="))
    loadCart();

function isNumber(s) {
    return /^-?\d+$/.test(s);
}

function getTotal() {
    let total = 0;
    let newTotal = 0; 
    cart.forEach(item => {
        let price = Object.values(item)[0];
        total += price;
    });
    newTotal = Math.round(total*100)/100;
    return newTotal;
}

function saveCart() {
    let newCart = [];
    cart.forEach(e => {
        let stringedObj = JSON.stringify(e);
        newCart.push(stringedObj);
    });
    let finalCookie = "cart=" + newCart.toString() + "; path=/";
    document.cookie = finalCookie;
}

function loadCart() {
    let stringedArray = document.cookie.split("=")[1];
    if(stringedArray === "")
        return;
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


document.getElementById("CCNum").addEventListener("paste", (e) => {
    if(e.cancelable) {
        e.preventDefault();
    }
});
document.getElementById("CCNum").addEventListener("input", () => {
    let content = document.getElementById("CCNum").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last) || content.length > 19) {
        document.getElementById("CCNum").value = content.substring(0, content.length - 1);
        return;
    }
    if(content.length != 0) {
        if(content.length % 5 == 0 && content.length < 20) {
            document.getElementById("CCNum").value = content.substring(0, content.length - 1);
            document.getElementById("CCNum").value += "-" + last;
        }
    }

    content = document.getElementById("CCNum").value;
    if(content.endsWith("--")) {
        document.getElementById("CCNum").value = content.substring(0, content.length - 1);
    }
    
});

document.getElementById("ExMonth").addEventListener("paste", (e) => {
    if(e.cancelable) {
        e.preventDefault();
    }
});
document.getElementById("ExMonth").addEventListener("input", () =>{
    let content = document.getElementById("ExMonth").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last) || content.length > 5) {
        document.getElementById("ExMonth").value = content.substring(0, content.length - 1)
        return;
    }

    if(content.length != 0) {
        if(content.length % 3 == 0 && content.length < 5) {
            document.getElementById("ExMonth").value = content.substring(0, content.length - 1);
            document.getElementById("ExMonth").value += "/" + last;
        }
    }
});

document.getElementById("Ccv").addEventListener("paste", (e) => {
    if(e.cancelable) {
        e.preventDefault();
    }
});
document.getElementById("Ccv").addEventListener("input", () =>{
    let content = document.getElementById("Ccv").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last) || content.length > 3) {
        document.getElementById("Ccv").value = content.substring(0, content.length - 1)
    }
});

document.getElementById("fphone").addEventListener("paste", (e) => {
    if(e.cancelable) {
        e.preventDefault();
    }
});
document.getElementById("fphone").addEventListener("input", () =>{
    let content = document.getElementById("fphone").value;
    let last = content.charAt(content.length - 1);
    if(!isNumber(last) || content.length > 12) {
        document.getElementById("fphone").value = content.substring(0, content.length - 1);
        return;
    }
    if(content.length != 0) {
        if(content.length % 4 == 0 && content.length < 7) {
            document.getElementById("fphone").value = content.substring(0, content.length - 1);
            document.getElementById("fphone").value += "-" + last;
        } else if(content.length % 8 == 0) {
            document.getElementById("fphone").value = content.substring(0, content.length - 1);
            document.getElementById("fphone").value += "-" + last;
        }
    }

    content = document.getElementById("fphone").value;
    if(content.endsWith("--")) {
        document.getElementById("fphone").value = content.substring(0, content.length - 1);
    }
});

document.getElementById("checkout-confirm").addEventListener("click", () => {
    let cname = document.getElementById("fcardName").value;
    let cardNum = document.getElementById("CCNum").value;
    let exp = document.getElementById("ExMonth").value;
    let ccv = document.getElementById("Ccv").value;

    let name = document.getElementById("fname").value;
    let email = document.getElementById("femail").value;
    let phone = document.getElementById("fphone").value;

    if(cname.length <= 0 || cardNum.length != 19 || exp.length != 5 || ccv.length != 3
        || name.length <= 0 || email.length <= 0 || !(email.endsWith(".com") || email.endsWith(".net") || email.endsWith(".org"))
        || phone.length != 12) {
            console.log("Missing required fields.");
            return;
        }

    document.getElementsByClassName("cardInfo").item(0).remove();
    document.getElementsByClassName("checkoutBox").item(0).remove();
    document.getElementsByClassName("menu check").item(0).remove();
    document.getElementById("checkout-confirm").remove();
    
    let newHeader = document.createElement("h1");
    newHeader.innerHTML = "Order placed.";
    newHeader.className = "confirmed-info";
    let info = document.createElement("p");
    info.innerText = `Name: ${name}\nCard Number: ****-${cardNum.substring(15, 20)}\nPhone Number: ${phone}`;
    document.getElementById("confirmed").appendChild(newHeader);
    document.getElementById("confirmed").appendChild(info);
}); 
