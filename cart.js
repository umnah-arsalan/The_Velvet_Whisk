// CART OPEN / CLOSE


const cartButton = document.querySelector(".floating-cart");
const cartPanel = document.querySelector(".cart-panel");
const closeButton = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");

// Open Cart
cartButton.addEventListener("click", function () {

    cartPanel.style.right = "0";

    if (overlay) {
        overlay.classList.add("show-overlay");
    }

    // Disable page scrolling
    document.body.style.overflow = "hidden";

});

// Close Cart
function closeCart() {

    cartPanel.style.right = "-380px";

    if (overlay) {
        overlay.classList.remove("show-overlay");
    }

    // Enable page scrolling
    document.body.style.overflow = "auto";

}

// Close with X button
if (closeButton) {

    closeButton.addEventListener("click", closeCart);

}

// Close by clicking overlay
if (overlay) {

    overlay.addEventListener("click", closeCart);

}




// SHOPPING CART


const buttons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

// Store products
let cart = [];




// ADD PRODUCTS
buttons.forEach(button => {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        // Check if product already exists
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

        // Cart stays closed until user clicks cart icon

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

            const product = document.createElement("div");

            product.classList.add("cart-product");

            product.innerHTML = `
                <strong>${item.name}</strong>

                <div class="quantity-controls">

                    <span>Quantity</span>

                    <button class="minus-btn">−</button>

                    <span>${item.quantity}</span>

                    <button class="plus-btn">+</button>

                </div>

                <p>
                    $${item.price} × ${item.quantity}
                    =
                    <strong>$${item.price * item.quantity}</strong>
                </p>

                <button class="remove-btn">
                    🗑 Remove
                </button>

                <hr>
            `;

            cartItems.appendChild(product);

            
            // PLUS BUTTON
            

            product.querySelector(".plus-btn").addEventListener("click", function () {

                item.quantity++;

                updateCart();

            });

            
            // MINUS BUTTON
            

            product.querySelector(".minus-btn").addEventListener("click", function () {

                item.quantity--;

                if (item.quantity <= 0) {

                    cart = cart.filter(p => p.name !== item.name);

                }

                updateCart();

            });

            
            // REMOVE BUTTON
            

            product.querySelector(".remove-btn").addEventListener("click", function () {

                cart = cart.filter(p => p.name !== item.name);

                updateCart();

            });

            total += item.price * item.quantity;

        });

    }

    totalElement.textContent = total;

}