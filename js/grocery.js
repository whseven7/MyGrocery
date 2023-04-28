// cart
let cartIcon = document.querySelector('#add-to-cart');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
};
// close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    //Remove item from cart
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //quantity changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    } 
    // add to cart
    let addCart = document.getElementsByClassName('add-cart'); 
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    } 

    let addCarts = document.getElementsByClassName('add-cart2'); 
    for (let i = 0; i < addCarts.length; i++) {
        let button = addCarts[i];
        button.addEventListener('click', addCartsClicked);
    } 
    
    document.getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);

    document.getElementsByClassName('clear-cart')[0]
    .addEventListener('click', clearButtonClicked);
}

localStorage.setItem('cart', cart);

function buyButtonClicked() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
        while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild); 
    }
    alert("Your order is placed");
    updateTotal();
}

function clearButtonClicked() {
    let cartButtonClicked = document.getElementsByClassName('cart-content')[0];
    while (cartButtonClicked.hasChildNodes()) {
        cartButtonClicked.removeChild(cartButtonClicked.firstChild);
    }
    updateTotal();
}

//Remove item from cart
function removeCartItem(event) {
    let  buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();  
}

//quantity change
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    if (isNaN(input.value) || input.value > 20) {
        alert('Max items are 20');
        input.value = 20;
    }
    updateTotal();
}

function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-name')[0].innerText;
    let price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    let stock = shopProducts.getElementsByClassName('product-stock')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-picture')[0].src;
    console.log(title, price, stock, productImg);
    addProductToCart(title, price, stock, productImg);
    updateTotal();
}

function addCartsClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-name')[0].innerText;
    let price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    let stock = shopProducts.getElementsByClassName('product-stock')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-picture')[0].src;
    console.log(title, price, stock, productImg);
    addProductToCart(title, price, stock, productImg);
    updateTotal();
}

function addProductToCart(title, price, stock, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');  
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return; 
        }
    }
    let cartBoxContent = `
    <img src="${productImg }" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <div class="cart-stock">${stock}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}

//update total
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$",""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price contains some cents
        total = Math.round(total *100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}   

function nameS() {
    let name = document.getElementById('nameS').value;
    
}