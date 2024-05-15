document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const clearCartButton = document.getElementById('clear-cart-btn');

    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-action="decrease">-</button>
                    <input class="quantity" type="number" value="${item.quantity}" min="1">
                    <button class="quantity-btn plus" data-action="increase">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            const quantityInput = cartItem.querySelector('.quantity');
            const minusButton = cartItem.querySelector('.quantity-btn.minus');
            const plusButton = cartItem.querySelector('.quantity-btn.plus');

            quantityInput.addEventListener('change', (event) => {
                item.quantity = parseInt(event.target.value);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartTotal();
            });

            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityInput.value = item.quantity;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartTotal();
                }
            });

            plusButton.addEventListener('click', () => {
                item.quantity++;
                quantityInput.value = item.quantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartTotal();
            });
        });
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.innerText = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyCartMessage);
    }

    function updateCartTotal() {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    }

    updateCartTotal();

    checkoutButton.addEventListener('click', () => {
        alert('Redirecting to checkout page');
        // window.location.href = 'checkout.html';
    });

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cartItems');
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerText = 'Total: $0';
    });
});
