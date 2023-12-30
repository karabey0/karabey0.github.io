let iconCart = document.querySelector('.fas');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');

})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})


let cartItems = [];

function updateCartCount() {
    const cartItemCount = document.getElementById('cartItemCount');
    cartItemCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

function addToCart(name, price, image) {
    const existingItem = cartItems.find(item => item.name === name && item.price === price && item.image === image);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cartItems.push(newItem);
    }

    updateCartCount();
    updateCart();
}

function updateCart() {
    const listCart = document.querySelector('.listCart');

    listCart.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="">
            </div>
            <div class="name">
                ${item.name}
            </div>
            <div class="totalPrice">
                $${item.price * item.quantity} (${item.quantity}x$${item.price})
            </div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;

        listCart.appendChild(cartItem);
    });

}


function updateQuantity(index, newQuantity) {
    cartItems[index].quantity = newQuantity;
    updateCart();
    updateCartCount();
}

document.querySelector('.listCart').addEventListener('click', function(event) {
    if (event.target.classList.contains('minus')) {
        const itemIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
        const currentQuantity = cartItems[itemIndex].quantity;
        if (currentQuantity > 1) {
            updateQuantity(itemIndex, currentQuantity - 1);
        }
    } else if (event.target.classList.contains('plus')) {
        const itemIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
        const currentQuantity = cartItems[itemIndex].quantity;
        updateQuantity(itemIndex, currentQuantity + 1);
    }
});
    
function calculateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}

document.querySelector('.checkOut').addEventListener('click', function() {
    const totalPrice = calculateTotalPrice();
    alert(`Toplam Fiyat: $${totalPrice}`);
});

function clearCart() {
    cartItems = []; 
    updateCart(); 
    updateCartCount(); 
}

document.querySelector('.clearAll').addEventListener('click', function() {
    clearCart(); 
});

