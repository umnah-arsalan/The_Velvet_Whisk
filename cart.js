
// CART OPEN / CLOSE


const cartButton = document.querySelector(".floating-cart");
const cartPanel = document.querySelector(".cart-panel");
const closeButton = document.querySelector(".close-cart");

cartButton.addEventListener("click", function () {
    cartPanel.style.right = "0";
});

if (closeButton) {
    closeButton.addEventListener("click", function () {
        cartPanel.style.right = "-380px";
    });
}



// SHOPPING CART


const buttons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

// Store all products here
let cart = [];



// ADD PRODUCT


buttons.forEach(button => {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        // Check whether the product already exists
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        // Automatically open cart after adding
        cartPanel.style.right = "0";

    });

});



// UPDATE CART


function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(item => {

            const product = document.createElement("p");

            product.innerHTML = `
                <strong>${item.name}</strong><br>
                Quantity: ${item.quantity}<br>
                $${item.price} × ${item.quantity} = <strong>$${item.price * item.quantity}</strong>
                <hr>
            `;

            cartItems.appendChild(product);

            total += item.price * item.quantity;

        });

    }

    totalElement.textContent = total;

}