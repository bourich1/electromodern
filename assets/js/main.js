
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Smartphone X1",
                category: "Smartphones",
                price: 699.99,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
                description: "The latest smartphone with advanced features, high-resolution camera, and long-lasting battery."
            },
            {
                id: 2,
                name: "Ultra Laptop Pro",
                category: "Laptops",
                price: 1299.99,
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                description: "Powerful laptop with high-performance processor, ample storage, and stunning display."
            },
            {
                id: 3,
                name: "Tablet Plus",
                category: "Tablets",
                price: 499.99,
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Versatile tablet perfect for work and entertainment with long battery life."
            },
            {
                id: 4,
                name: "Wireless Earbuds",
                category: "Accessories",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1108&q=80",
                description: "High-quality wireless earbuds with noise cancellation and premium sound."
            },
            {
                id: 5,
                name: "Smart Watch",
                category: "Wearables",
                price: 249.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
                description: "Feature-rich smartwatch with health monitoring and smartphone connectivity."
            },
            {
                id: 6,
                name: "Gaming Console",
                category: "Gaming",
                price: 399.99,
                image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Next-gen gaming console with immersive graphics and extensive game library."
            },
            {
                id: 7,
                name: "Bluetooth Speaker",
                category: "Audio",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
                description: "Portable Bluetooth speaker with 360-degree sound and waterproof design."
            },
            {
                id: 8,
                name: "4K Monitor",
                category: "Monitors",
                price: 349.99,
                image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Ultra HD monitor with vibrant colors and fast refresh rate for gaming and work."
            },
            {
                id: 9,
                name: "Wireless Keyboard",
                category: "Accessories",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
                description: "Ergonomic wireless keyboard with backlit keys and long battery life."
            },
            {
                id: 10,
                name: "Action Camera",
                category: "Cameras",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                description: "Compact action camera with 4K video recording and waterproof housing."
            }
        ];

        // DOM Elements
        const homePage = document.getElementById('homePage');
        const productDetails = document.getElementById('productDetails');
        const productsGrid = document.getElementById('productsGrid');
        const detailsContainer = document.getElementById('detailsContainer');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutForm = document.getElementById('checkoutForm');
        const customerForm = document.getElementById('customerForm');
        const cancelCheckout = document.getElementById('cancelCheckout');
        const backBtn = document.getElementById('backBtn');
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        // Cart state
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Initialize the page
        function init() {
            renderProducts();
            updateCartCount();
            
            // Event listeners
            cartIcon.addEventListener('click', openCart);
            closeCart.addEventListener('click', closeCartModal);
            checkoutBtn.addEventListener('click', showCheckoutForm);
            cancelCheckout.addEventListener('click', hideCheckoutForm);
            customerForm.addEventListener('submit', submitOrder);
            backBtn.addEventListener('click', showHomePage);
            themeToggle.addEventListener('click', toggleTheme);
            
            // Check for saved theme
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.className = 'fas fa-sun';
            }
        }

        // Render products on the home page
        function renderProducts() {
            productsGrid.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-category">${product.category}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-footer">
                            <button class="add-to-cart-btn" data-id="${product.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
                
                // Add event listeners
                const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToCart(product);
                });
                
                productCard.addEventListener('click', () => showProductDetails(product));
            });
        }

        // Show product details page
        function showProductDetails(product) {
            homePage.style.display = 'none';
            productDetails.style.display = 'block';
            
            detailsContainer.innerHTML = `
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details-info">
                    <h1>${product.name}</h1>
                    <div class="details-category">${product.category}</div>
                    <div class="details-price">$${product.price.toFixed(2)}</div>
                    <p class="details-description">${product.description}</p>
                    <button class="add-to-cart-large" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            
            // Add event listener to the Add to Cart button
            const addToCartBtn = detailsContainer.querySelector('.add-to-cart-large');
            addToCartBtn.addEventListener('click', () => addToCart(product));
        }

        // Show home page
        function showHomePage() {
            productDetails.style.display = 'none';
            homePage.style.display = 'block';
        }

        // Add product to cart
        function addToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCartCount();
            saveCartToStorage();
            
            // Show a quick confirmation
            const notification = document.createElement('div');
            notification.textContent = `${product.name} added to cart!`;
            notification.style.position = 'fixed';
            notification.style.bottom = '80px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--primary-color)';
            notification.style.color = 'white';
            notification.style.padding = '10px 15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
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
            cartModal.style.display = 'flex';
        }

        // Close cart modal
        function closeCartModal() {
            cartModal.style.display = 'none';
            hideCheckoutForm();
        }

        // Render cart items
        function renderCartItems() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
                cartTotal.textContent = '0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.id}" readonly>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <span class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
                
                // Add event listeners for quantity buttons
                const decreaseBtn = cartItem.querySelector('.decrease');
                const increaseBtn = cartItem.querySelector('.increase');
                const removeBtn = cartItem.querySelector('.remove-item');
                
                decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
                increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
                removeBtn.addEventListener('click', () => removeFromCart(item.id));
            });
            
            cartTotal.textContent = total.toFixed(2);
        }

        // Update item quantity in cart
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
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
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            saveCartToStorage();
            renderCartItems();
        }

        // Save cart to localStorage
        function saveCartToStorage() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Show checkout form
        function showCheckoutForm() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            checkoutForm.style.display = 'block';
            checkoutBtn.style.display = 'none';
        }

        // Hide checkout form
        function hideCheckoutForm() {
            checkoutForm.style.display = 'none';
            checkoutBtn.style.display = 'block';
        }

        // Submit order and send via WhatsApp
        function submitOrder(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            
            // Format order message
            let message = `New Order from ElectroModern%0A%0A`;
            message += `Customer Details:%0A`;
            message += `Name: ${name}%0A`;
            message += `Phone: ${phone}%0A`;
            message += `Email: ${email}%0A`;
            message += `Address: ${address}%0A%0A`;
            message += `Order Details:%0A`;
            
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                message += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}%0A`;
            });
            
            message += `%0ATotal: $${total.toFixed(2)}`;
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/?text=${message}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Clear cart and close modal
            cart = [];
            updateCartCount();
            saveCartToStorage();
            closeCartModal();
            hideCheckoutForm();
            customerForm.reset();
            
            // Show confirmation
            alert('Your order has been placed! You will be redirected to WhatsApp to complete your order.');
        }

        // Toggle between light and dark mode
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.className = 'fas fa-sun';
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.className = 'fas fa-moon';
            }
        }

        // Initialize the application
        init();
