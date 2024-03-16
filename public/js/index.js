let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Check DOM ready state and call the function
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Function to handle actions when DOM is ready
function ready() {
    // Remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    loadCartItems();
}

// Remove cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

// Quantity changed
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
}

// Add cart function
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement.parentElement;
    var title = shopProduct.querySelector('.product-title').innerText;
    var price = shopProduct.querySelector('.price').innerText;
    var productImg = shopProduct.querySelector('.product-img').src;
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
}

// Add product to cart
// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement('div');
//     cartShopBox.classList.add('cart-box');
//     var cartContent = document.querySelector('.cart-content');

//     var cartItems = cartContent.getElementsByClassName('cart-box');

//     for (var i = 0; i < cartItems.length; i++) {
//         var cartItemTitle = cartItems[i].getElementsByClassName('cart-product-title')[0];
//         if (cartItemTitle.innerText === title) {
//             alert('You have already added this item to the cart');
//             return;
//         }
//     }

//     var cartBoxContent = `
//         <img src="${productImg}" alt="" class="cart-img"/>
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" name="" value="1" class="cart-quantity">
//         </div>
//         <i class='bx bx-trash  cart-remove'></i>`;

//     cartShopBox.innerHTML = cartBoxContent;
//     cartContent.appendChild(cartShopBox);

//     cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
//     cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

//     saveCartItems();
// }



//new code 
// Add product to cart
// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement('div');
//     cartShopBox.classList.add('cart-box');
//     var cartContent = document.querySelector('.cart-content');

//     var cartItemTitles = cartContent.getElementsByClassName('cart-product-title');

//     for (var i = 0; i < cartItemTitles.length; i++) {
//         if (cartItemTitles[i].innerText === title) {
//             alert('You have already added this item to the cart');
//             return;
//         }
//     }

//     var cartBoxContent = `
//         <img src="${productImg}" alt="" class="cart-img"/>
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" name="" value="1" class="cart-quantity">
//         </div>
//         <i class='bx bx-trash  cart-remove'></i>`;

//     cartShopBox.innerHTML = cartBoxContent;
//     cartContent.appendChild(cartShopBox);

//     cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
//     cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

//     saveCartItems();
// }

// Add product to cart
// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement('div');
//     cartShopBox.classList.add('cart-box');
//     var cartContent = document.querySelector('.cart-content');

//     var cartBoxContent = `
//         <img src="${productImg}" alt="" class="cart-img"/>
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input type="number" name="" value="1" class="cart-quantity">
//         </div>
//         <i class='bx bx-trash  cart-remove'></i>`;

//     cartShopBox.innerHTML = cartBoxContent;
//     cartContent.appendChild(cartShopBox);

//     cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
//     cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

//     saveCartItems();
// }


// Add product to cart
function addProductToCart(title, price, productImg) {
    var cartContent = document.querySelector('.cart-content');
    var cartItems = cartContent.getElementsByClassName('cart-box');

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var cartItemTitle = cartItem.querySelector('.cart-product-title').innerText;
        var cartItemPrice = cartItem.querySelector('.cart-price').innerText;
        var cartItemImg = cartItem.querySelector('.cart-img').getAttribute('src');

        if (cartItemTitle === title && cartItemPrice === price && cartItemImg === productImg) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img"/>
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" name="" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash  cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);

    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);

    saveCartItems();
}



// Update total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
    localStorage.setItem('cartTotal', total);
}

// Save items in cart
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load items in cart
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }

    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
    }
}
