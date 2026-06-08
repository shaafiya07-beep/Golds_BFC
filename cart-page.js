// cart-page.js
const cartContainer = document.getElementById("cartContainer");
const itemsTotal = document.getElementById("itemsTotal");
const itemsCount = document.getElementById("itemsCount");
const subtotal = document.getElementById("subtotal");
const totalAmount = document.getElementById("totalAmount");
const recommendedGrid = document.getElementById("recommendedGrid");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function renderCartPage() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-box">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add tasty B.F.C items to start your order.</p>
        <a href="menu.html">Browse Menu</a>
      </div>
    `;
  } else {
    cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.size ? item.size : ""} ${item.detail ? "• " + item.detail : ""}</p>

          <div class="qty-control">
            <button onclick="decreaseItem('${item.key}')">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseItem('${item.key}')">+</button>
          </div>
        </div>

        <div class="cart-item-price">
          <strong>₹${item.price * item.quantity}</strong>
          <button class="remove-btn" onclick="removeItem('${item.key}')">Remove</button>
        </div>
      </div>
    `).join("");
  }

  updateSummary();
  updateCartCount();
}

function updateSummary() {
  const cart = getCart();
  const total = getCartTotal();
  const count = getCartCount();

  itemsTotal.textContent = `₹${total}`;
  itemsCount.textContent = count;
  subtotal.textContent = `₹${total}`;
  totalAmount.textContent = `₹${total}`;
}

function increaseItem(key) {
  increaseCartItem(key);
  renderCartPage();
}

function decreaseItem(key) {
  decreaseCartItem(key);
  renderCartPage();
}

function removeItem(key) {
  let cart = getCart();
  cart = cart.filter(item => item.key !== key);
  saveCart(cart);
  renderCartPage();
}

function getLowestPrice(item) {
  if (item.sizes) return item.sizes[0].price;
  return item.price;
}

function renderRecommended() {
  const recommendedNames = ["Chicken Popcorn", "Chicken Pizza", "Chicken Burger"];

  const recommendedItems = menuItems.filter(item =>
    recommendedNames.includes(item.name)
  );

  recommendedGrid.innerHTML = recommendedItems.map(item => `
    <div class="recommended-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>From ₹${getLowestPrice(item)}</p>
      <button onclick="addRecommended(${item.id})">ADD</button>
    </div>
  `).join("");
}

function addRecommended(id) {
  const item = menuItems.find(product => product.id === id);
  if (!item) return;

  if (item.sizes) {
    addToCart(item, item.sizes[0]);
  } else {
    addToCart(item);
  }

  renderCartPage();
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

renderCartPage();
renderRecommended();
updateCartCount();