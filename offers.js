// offers.js

const offers = [
  {
    id: "offer1",
    name: "Fried Combo 1",
    items: ["Chicken Popcorn Regular", "Crispy Wings 5 pcs", "Crispy Fried Chicken 2 pcs"],
    price: 209,
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer2",
    name: "Fried Combo 2",
    items: ["Chicken Popcorn Medium", "Chicken Lolipop 4 pcs", "Boneless Strips 4 pcs"],
    price: 409,
    image: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer3",
    name: "Fried Combo 3",
    items: ["Chicken Popcorn Medium", "Crispy Fried Chicken 4 pcs", "Crispy Wings 4 pcs"],
    price: 509,
    image: "https://images.pexels.com/photos/13999297/pexels-photo-13999297.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer4",
    name: "Fried Combo 4",
    items: ["Boneless Strips 8 pcs", "Crispy Fried Chicken 4 pcs", "Chicken Lolipop 6 pcs", "Chicken Popcorn Medium"],
    price: 799,
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer5",
    name: "Fried Combo 5",
    items: ["Boneless Strips 8 pcs", "Crispy Fried Chicken 4 pcs", "Chicken Lolipop 8 pcs", "Crispy Wings 4 pcs"],
    price: 999,
    image: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer6",
    name: "Pizza Combo 1",
    items: ["Chicken Pizza Medium", "Chicken Cheese Sandwich"],
    price: 299,
    image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer7",
    name: "Pizza Combo 2",
    items: ["Chicken Pizza Small", "Chicken Pizza Medium", "Chicken Sandwich", "Veg Sandwich"],
    price: 499,
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer8",
    name: "Pizza Combo 3",
    items: ["Chicken Pizza Medium 3 pcs", "Chicken Burger 2 pcs"],
    price: 799,
    image: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "offer9",
    name: "Pizza Combo 4",
    items: ["Chicken Pizza Medium 2 pcs", "Paneer Pizza Medium", "Chicken Cheese Burger 2 pcs", "Paneer Sandwich"],
    price: 849,
    image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const offersGrid = document.getElementById("offersGrid");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

const chickenSelect = document.getElementById("chickenSelect");
const mainSelect = document.getElementById("mainSelect");
const extraSelect = document.getElementById("extraSelect");
const customComboTotal = document.getElementById("customComboTotal");
const addCustomComboBtn = document.getElementById("addCustomComboBtn");

function getOfferKey(id) {
  return `${id}-`;
}

function getItemQuantityByKey(key) {
  const cart = getCart();
  const item = cart.find(cartItem => cartItem.key === key);
  return item ? item.quantity : 0;
}

function addOfferToCart(offer) {
  const cart = getCart();
  const key = getOfferKey(offer.id);

  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: offer.id,
      key,
      name: offer.name,
      size: "",
      detail: offer.items.join(", "),
      price: offer.price,
      quantity: 1,
      image: offer.image,
      type: "offer"
    });
  }

  saveCart(cart);
  renderOffers();
}

function renderOffers() {
  if (!offersGrid) return;

  offersGrid.innerHTML = offers.map(offer => {
    const key = getOfferKey(offer.id);
    const qty = getItemQuantityByKey(key);

    return `
      <div class="offer-card">
        <img src="${offer.image}" alt="${offer.name}">
        <h3>${offer.name}</h3>

        <ul>
          ${offer.items.map(item => `<li>✅ ${item}</li>`).join("")}
        </ul>

        <div class="offer-bottom">
          <strong>₹${offer.price}</strong>

          ${
            qty > 0
              ? `
                <div class="qty-control">
                  <button onclick="decreaseOffer('${key}')">−</button>
                  <span>${qty}</span>
                  <button onclick="increaseOffer('${key}')">+</button>
                </div>
              `
              : `<button class="deal-btn" onclick="addOfferById('${offer.id}')">ADD DEAL</button>`
          }
        </div>
      </div>
    `;
  }).join("");

  updateCartCount();
}

function addOfferById(id) {
  const offer = offers.find(item => item.id === id);
  if (offer) addOfferToCart(offer);
}

function increaseOffer(key) {
  increaseCartItem(key);
  renderOffers();
}

function decreaseOffer(key) {
  decreaseCartItem(key);
  renderOffers();
}

function getBasePrice(item) {
  if (!item) return 0;
  if (item.sizes) return item.sizes[0].price;
  return item.price;
}

function fillSelect(select, items) {
  if (!select) return;

  select.innerHTML = items.map(item => `
    <option value="${item.id}" data-price="${getBasePrice(item)}">
      ${item.name} - ₹${getBasePrice(item)}
    </option>
  `).join("");
}

function getSelectedItem(select) {
  if (!select) return null;

  const id = String(select.value);
  return menuItems.find(item => String(item.id) === id);
}

function updateCustomTotal() {
  const chicken = getSelectedItem(chickenSelect);
  const main = getSelectedItem(mainSelect);
  const extra = getSelectedItem(extraSelect);

  const total =
    getBasePrice(chicken) +
    getBasePrice(main) +
    getBasePrice(extra);

  if (customComboTotal) {
    customComboTotal.textContent = `₹${total}`;
  }
}

function setupComboBuilder() {
  if (!chickenSelect || !mainSelect || !extraSelect) return;

  const chickenItems = menuItems.filter(item => item.category === "Fried Chicken");
  const mainItems = menuItems.filter(item => item.category === "Pizza" || item.category === "Burger");
  const extraItems = menuItems.filter(item => item.category === "Sandwich" || item.category === "Combos");

  fillSelect(chickenSelect, chickenItems);
  fillSelect(mainSelect, mainItems);
  fillSelect(extraSelect, extraItems);

  updateCustomTotal();

  chickenSelect.addEventListener("change", updateCustomTotal);
  mainSelect.addEventListener("change", updateCustomTotal);
  extraSelect.addEventListener("change", updateCustomTotal);
}

function addCustomCombo() {
  const chicken = getSelectedItem(chickenSelect);
  const main = getSelectedItem(mainSelect);
  const extra = getSelectedItem(extraSelect);

  if (!chicken || !main || !extra) return;

  const total =
    getBasePrice(chicken) +
    getBasePrice(main) +
    getBasePrice(extra);

  const comboId = `custom-${chicken.id}-${main.id}-${extra.id}`;
  const key = `${comboId}-`;

  const cart = getCart();
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: comboId,
      key,
      name: "Custom BFC Combo",
      size: "",
      detail: `${chicken.name}, ${main.name}, ${extra.name}`,
      price: total,
      quantity: 1,
      image: chicken.image,
      type: "offer"
    });
  }

  saveCart(cart);
  renderOffers();
  alert("Custom combo added to cart!");
}

if (addCustomComboBtn) {
  addCustomComboBtn.addEventListener("click", addCustomCombo);
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

async function initOffersPage() {
  if (window.menuDataReady) {
    await window.menuDataReady;
  }

  renderOffers();
  setupComboBuilder();
  updateCartCount();
}

initOffersPage();