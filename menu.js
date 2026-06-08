// menu.js

const foodGrid = document.getElementById("foodGrid");
const categoryTitle = document.getElementById("categoryTitle");
const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const categoryButtons = document.querySelectorAll(".cat-btn");
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const sizeModal = document.getElementById("sizeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const sizeOptions = document.getElementById("sizeOptions");
const modalAddBtn = document.getElementById("modalAddBtn");
const modalClose = document.getElementById("modalClose");

let currentCategory = "Popular";
let currentSearch = "";
let selectedProduct = null;
let selectedSize = null;
let loadingInterval = null;

const loadingMessages = [
  "Preparing fresh flavors for you 🍗",
  "Crispy chicken coming right up 🔥",
  "Loading today's B.F.C favorites 🍔",
  "Freshly cooked happiness is on the way 🍕",
  "Gathering delicious deals for you 🎉",
  "Hot and crispy goodness loading 😋",
  "Serving your cravings in a moment 🍟",
  "Getting the menu ready for you 🍽️"
];

function showLoadingMessages() {
  if (!foodGrid) return;

  foodGrid.innerHTML = `
    <div class="menu-loader">
      <div class="loader-icon">🍗</div>
      <h2 id="loaderText" class="show">Preparing fresh flavors for you 🍗</h2>
      <p>Please wait while we bring the menu fresh from B.F.C.</p>
    </div>
  `;

  const loaderText = document.getElementById("loaderText");
  let index = 0;

  loadingInterval = setInterval(() => {
    if (!loaderText) return;

    loaderText.classList.remove("show");

    setTimeout(() => {
      index = (index + 1) % loadingMessages.length;
      loaderText.textContent = loadingMessages[index];
      loaderText.classList.add("show");
    }, 250);
  }, 1800);
}

function hideLoadingMessages() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
  }

  loadingInterval = null;
}

function getProductsByCategory(category) {
  if (category === "Popular") {
    const popularItems = menuItems.filter(item => item.popular);

    if (popularItems.length > 0) {
      return popularItems;
    }

    return menuItems.filter(item =>
      ["Chicken Popcorn", "Crispy Wings", "Chicken Burger", "Chicken Pizza"].includes(item.name)
    );
  }

  return menuItems.filter(item => item.category === category);
}

function getFilteredProducts() {
  let products = getProductsByCategory(currentCategory);

  if (currentSearch.trim() !== "") {
    const keyword = currentSearch.toLowerCase();

    products = products.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  }

  return products;
}

function getStartingPrice(item) {
  if (item.sizes) return `From ₹${item.sizes[0].price}`;
  return `₹${item.price}`;
}

function getCardQuantity(item) {
  return getCartQuantity(item.id);
}

function displayProducts(category = currentCategory) {
  currentCategory = category;

  if (categoryTitle) {
    categoryTitle.textContent = category === "Popular" ? "Popular Items" : category;
  }

  categoryButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  const products = getFilteredProducts();

  if (products.length === 0) {
    foodGrid.innerHTML = `
      <div class="no-results">
        <h3>No items found</h3>
        <p>Try searching another food item.</p>
      </div>
    `;
    renderCartPanel();
    return;
  }

  foodGrid.innerHTML = products.map(item => {
    const qty = getCardQuantity(item);

    return `
      <div class="food-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="card-price">${getStartingPrice(item)}</div>

        <div class="food-bottom">
          ${
            item.sizes
              ? `<small>${item.sizes.map(size => `${size.name} ₹${size.price}`).join(" • ")}</small>`
              : `<small>Ready to order</small>`
          }

          <div class="card-action">
            ${
              qty > 0
                ? `
                  <div class="qty-control">
                    <button onclick="decreaseProduct('${item.id}')">−</button>
                    <span>${qty}</span>
                    <button onclick="increaseProduct('${item.id}')">+</button>
                  </div>
                `
                : `<button class="add-btn" onclick="handleAdd('${item.id}')">ADD</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join("");

  renderCartPanel();
}

function handleAdd(id) {
  const item = menuItems.find(product => String(product.id) === String(id));
  if (!item) return;

  if (item.sizes) {
    openSizeModal(item);
  } else {
    addToCart(item);
    refreshUI();
  }
}

function openSizeModal(item) {
  selectedProduct = item;
  selectedSize = item.sizes[0];

  modalImage.src = item.image;
  modalTitle.textContent = item.name;
  modalDesc.textContent = "Choose your preferred size";

  sizeOptions.innerHTML = item.sizes.map((size, index) => `
    <div class="size-option ${index === 0 ? "active" : ""}" onclick="selectSize(${index})">
      <div>
        <strong>${size.name}</strong>
        <span>${size.detail || ""}</span>
      </div>
      <b>₹${size.price}</b>
    </div>
  `).join("");

  sizeModal.classList.add("show");
}

function selectSize(index) {
  selectedSize = selectedProduct.sizes[index];

  document.querySelectorAll(".size-option").forEach((option, i) => {
    option.classList.toggle("active", i === index);
  });
}

function closeSizeModal() {
  sizeModal.classList.remove("show");
  selectedProduct = null;
  selectedSize = null;
}

modalAddBtn.addEventListener("click", () => {
  if (!selectedProduct || !selectedSize) return;

  addToCart(selectedProduct, selectedSize);
  closeSizeModal();
  refreshUI();
});

modalClose.addEventListener("click", closeSizeModal);

sizeModal.addEventListener("click", e => {
  if (e.target === sizeModal) closeSizeModal();
});

function increaseProduct(id) {
  const cart = getCart();
  const matchedItem = cart.find(item => String(item.id) === String(id));

  if (matchedItem) {
    increaseCartItem(matchedItem.key);
    refreshUI();
  }
}

function decreaseProduct(id) {
  const cart = getCart();
  const matchedItem = [...cart].reverse().find(item => String(item.id) === String(id));

  if (matchedItem) {
    decreaseCartItem(matchedItem.key);
    refreshUI();
  }
}

function renderCartPanel() {
  const cart = getCart();

  if (!cartItems || !subtotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-top">
          <div>
            <h4>${item.name}</h4>
            ${item.size ? `<small>${item.size} ${item.detail ? "• " + item.detail : ""}</small>` : ""}
          </div>

          <div class="cart-item-price">₹${item.price * item.quantity}</div>
        </div>

        <div class="cart-item-actions">
          <div class="qty-control">
            <button onclick="decreaseCartFromPanel('${item.key}')">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseCartFromPanel('${item.key}')">+</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  subtotal.textContent = `₹${getCartTotal()}`;
  updateCartCount();
}

function increaseCartFromPanel(key) {
  increaseCartItem(key);
  refreshUI();
}

function decreaseCartFromPanel(key) {
  decreaseCartItem(key);
  refreshUI();
}

function refreshUI() {
  displayProducts(currentCategory);
  renderCartPanel();
  updateCartCount();
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentSearch = "";
    searchInput.value = "";
    displayProducts(button.dataset.category);
  });
});

searchInput.addEventListener("input", e => {
  currentSearch = e.target.value;
  displayProducts(currentCategory);
});

searchBtn.addEventListener("click", () => {
  currentSearch = searchInput.value;
  displayProducts(currentCategory);
});

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

async function initMenuPage() {
  showLoadingMessages();

  if (window.menuDataReady) {
    await window.menuDataReady;
  }

  hideLoadingMessages();

  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category");

  displayProducts(selectedCategory || "Popular");
  renderCartPanel();
  updateCartCount();
}

initMenuPage();