let iconCart = document.querySelector('.fas');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

let listProducts = []
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');

})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})



