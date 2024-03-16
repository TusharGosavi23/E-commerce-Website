// const payBtn = document.querySelector('.btn-buy');

// payBtn.addEventListener('click', ()=>{
//     fetch('/stripe-checkout', {
//         method:'post',
//         headers: new Headers({'Content-Type':'application/JSON'}),
//         body:JSON.stringify({
//           item:JSON.parse(localStorage.getItem('cartItems')),  
//         }),
//     })
//     .then((res) => res.json())
//     .then((url) => {
//         location.href = url;
//     })
//     .catch((err) => console.log(err));

// });

const payBtn = document.querySelector('.btn-buy');

payBtn.addEventListener('click', () => {
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/JSON' }),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cartItems')), // Changed 'item' to 'items'
        }),
    })
        .then((res) => res.json())
        .then((url) => {
            location.href = url;
            clearCart();
        })
        .catch((err) => console.log(err));
});

//clear the cart items after payment

function clearCart(){
    var cartContent = document.getElementsByClassName('cart-content'[0]);
    cartContent.innerHTML = '';
    updatetotal();
    localStorage.removeItem('cartItems');

}
