// cart.js
const CART_KEY = "bfcCart";
const FREE_FRIES_KEY = "free-french-fries-offer";
const FREE_FRIES_MINIMUM = 500;

function getCart() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  return cart.filter(item =>
    item &&
    item.name &&
    item.key &&
    typeof item.price === "number" &&
    typeof item.quantity === "number"
  );
}

function getPaidCartTotal(cart) {
  return cart
    .filter(item => item.key !== FREE_FRIES_KEY)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyFreeFriesOffer(cart) {
  let cleanCart = cart.filter(item => item.key !== FREE_FRIES_KEY);

  const paidTotal = getPaidCartTotal(cleanCart);

  if (paidTotal >= FREE_FRIES_MINIMUM) {
    cleanCart.push({
      id: "free-french-fries",
      key: FREE_FRIES_KEY,
      name: "French Fries",
      size: "Regular",
      detail: "FREE with order above ₹500",
      price: 0,
      quantity: 1,
      image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "free"
    });
  }

  return cleanCart;
}

function saveCart(cart) {
  let cleanCart = cart.filter(item =>
    item &&
    item.name &&
    item.key &&
    typeof item.price === "number" &&
    typeof item.quantity === "number"
  );

  cleanCart = applyFreeFriesOffer(cleanCart);

  localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
  updateCartCount();
}

function makeCartKey(id, size = "") {
  return `${id}-${size}`;
}

function addToCart(item, selectedSize = null) {
  const cart = getCart();

  const finalItem = {
    id: item.id,
    key: makeCartKey(item.id, selectedSize ? selectedSize.name : ""),
    name: item.name,
    size: selectedSize ? selectedSize.name : "",
    detail: selectedSize ? selectedSize.detail || "" : "",
    price: selectedSize ? selectedSize.price : item.price,
    quantity: 1,
    image: item.image
  };

  const existing = cart.find(cartItem => cartItem.key === finalItem.key);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(finalItem);
  }

  saveCart(cart);
}

function increaseCartItem(key) {
  if (key === FREE_FRIES_KEY) return;

  const cart = getCart();
  const item = cart.find(cartItem => cartItem.key === key);

  if (item) item.quantity++;

  saveCart(cart);
}

function decreaseCartItem(key) {
  if (key === FREE_FRIES_KEY) return;

  let cart = getCart();
  const item = cart.find(cartItem => cartItem.key === key);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter(cartItem => cartItem.key !== key);
  }

  saveCart(cart);
}

function removeCartItem(key) {
  if (key === FREE_FRIES_KEY) return;

  let cart = getCart();
  cart = cart.filter(item => item.key !== key);
  saveCart(cart);
}

function getCartQuantity(id) {
  const cart = getCart();

  return cart
    .filter(item => item.id === id && item.key !== FREE_FRIES_KEY)
    .reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart()
    .filter(item => item.key !== FREE_FRIES_KEY)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return getCart()
    .filter(item => item.key !== FREE_FRIES_KEY)
    .reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const count = getCartCount();

  document.querySelectorAll("#navCartCount, #cartCount").forEach(el => {
    el.textContent = count;
  });
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  saveCart(getCart());
  updateCartCount();
});