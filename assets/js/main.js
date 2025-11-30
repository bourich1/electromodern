// DOM Elements
const homePage = document.getElementById("homePage");
const productDetails = document.getElementById("productDetails");
const productsGrid = document.getElementById("productsGrid");
const detailsContainer = document.getElementById("detailsContainer");
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutForm = document.getElementById("checkoutForm");
const customerForm = document.getElementById("customerForm");
const cancelCheckout = document.getElementById("cancelCheckout");
const backBtn = document.getElementById("backBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize the page
function init() {
  renderProducts();
  updateCartCount();

  // Event listeners
  cartIcon.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartModal);
  checkoutBtn.addEventListener("click", showCheckoutForm);
  cancelCheckout.addEventListener("click", hideCheckoutForm);
  customerForm.addEventListener("submit", submitOrder);
  backBtn.addEventListener("click", showHomePage);
  themeToggle.addEventListener("click", toggleTheme);

  // Check for saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.className = "fas fa-sun";
  }
}
// Render products on the home page
let data = [];

fetch("data.json")
  .then((res) => res.json())
  .then((products) => {
    data = products;
    renderProducts();
  })
  .catch((err) => console.error("Error loading JSON:", err));

function renderProducts() {
  productsGrid.innerHTML = "";
  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.setAttribute("data-aos", "fade-up");
    productCard.setAttribute("data-aos-duration", "1000");
    productCard.className = "product-card";
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-footer">
             <div class="product-price">${product.price.toFixed(2)} DH</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    productsGrid.appendChild(productCard);

    const addToCartBtn = productCard.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    productCard.addEventListener("click", () => showProductDetails(product));
  });
}

// Show product details page
function showProductDetails(product) {
  homePage.style.display = "none";
  document.title = product.name + " - ElectroModern";
  productDetails.style.display = "block";
  window.scrollTo(0, -10);

  detailsContainer.innerHTML = `
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details-info">
                    <h1>${product.name}</h1>
                    <div class="details-category">${product.category}</div>
                    <div class="details-price">${product.price.toFixed(
                      2
                    )} DH</div>
                    <p class="details-description">${product.description}</p>
                    <button class="add-to-cart-large" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;

  // Add event listener to the Add to Cart button
  const addToCartBtn = detailsContainer.querySelector(".add-to-cart-large");
  addToCartBtn.addEventListener("click", () =>{
    addToCart(product);
    openCart();
  });
}

// Show home page
function showHomePage() {
  productDetails.style.display = "none";
  homePage.style.display = "block";
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartCount();
  saveCartToStorage();

  // Show a quick confirmation
  const notification = document.createElement("div");
  notification.textContent = `${product.name} added to cart!`;
  notification.style.position = "fixed";
  notification.style.bottom = "80px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--primary-color)";
  notification.style.color = "white";
  notification.style.padding = "10px 15px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "1000";
  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

// Update cart count in header
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Open cart modal
function openCart() {
  renderCartItems();
  cartModal.style.display = "flex";
}

// Close cart modal
function closeCartModal() {
  cartModal.style.display = "none";
  hideCheckoutForm();
}

// Render cart items
function renderCartItems() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <img src="${item.image}" alt="${
      item.name
    }" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(
                          2
                        )} DH</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${
                              item.id
                            }">-</button>
                            <input type="text" class="quantity-input" value="${
                              item.quantity
                            }" data-id="${item.id}" readonly>
                            <button class="quantity-btn increase" data-id="${
                              item.id
                            }">+</button>
                            <span class="remove-item" data-id="${
                              item.id
                            }"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                `;
    cartItems.appendChild(cartItem);

    // Add event listeners for quantity buttons
    const decreaseBtn = cartItem.querySelector(".decrease");
    const increaseBtn = cartItem.querySelector(".increase");
    const removeBtn = cartItem.querySelector(".remove-item");

    decreaseBtn.addEventListener("click", () => updateQuantity(item.id, -1));
    increaseBtn.addEventListener("click", () => updateQuantity(item.id, 1));
    removeBtn.addEventListener("click", () => removeFromCart(item.id));
  });

  cartTotal.textContent = total.toFixed(2);
}

// Update item quantity in cart
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartCount();
      saveCartToStorage();
      renderCartItems();
    }
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  saveCartToStorage();
  renderCartItems();
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show checkout form
function showCheckoutForm() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  checkoutForm.style.display = "block";
  checkoutBtn.style.display = "none";
}

// Hide checkout form
function hideCheckoutForm() {
  checkoutForm.style.display = "none";
  checkoutBtn.style.display = "block";
}

// Submit order and send via WhatsApp
function submitOrder(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  // Format order message
  let message = `New Order from ElectroModern%0A%0A`;
  message += `Customer Details:%0A`;
  message += `Name: ${name}%0A`;
  message += `Phone: ${phone}%0A`;
  message += `Email: ${email}%0A`;
  message += `Address: ${address}%0A%0A`;
  message += `Order Details:%0A`;

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${item.name} - $${item.price.toFixed(2)} x ${
      item.quantity
    } = $${itemTotal.toFixed(2)}%0A`;
  });

  message += `%0ATotal: $${total.toFixed(2)}`;

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/212684303273?text=${message}`;

  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");

  // Clear cart and close modal
  cart = [];
  updateCartCount();
  saveCartToStorage();
  closeCartModal();
  hideCheckoutForm();
  customerForm.reset();

  // Show confirmation
  alert(
    "Your order has been placed! You will be redirected to WhatsApp to complete your order."
  );
}

// Toggle between light and dark mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.className = "fas fa-sun";
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.className = "fas fa-moon";
  }
}

// Initialize the application
init();
