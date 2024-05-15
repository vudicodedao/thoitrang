document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText.slice(1));

            let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
            let existingItem = cartItems.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
    });
});
