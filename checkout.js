// checkout.js
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

const checkoutForm = document.getElementById("checkoutForm");
const emptyCheckout = document.getElementById("emptyCheckout");
const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");

const CUSTOMER_NAME = document.getElementById("customerName");
const CUSTOMER_PHONE = document.getElementById("customerPhone");
const CUSTOMER_ADDRESS = document.getElementById("customerAddress");
const CUSTOMER_LANDMARK = document.getElementById("customerLandmark");
const CUSTOMER_LOCATION_LINK = document.getElementById("customerLocationLink");

const openMapBtn = document.getElementById("openMapBtn");
const closeMapBtn = document.getElementById("closeMapBtn");
const confirmLocationBtn = document.getElementById("confirmLocationBtn");
const mapModal = document.getElementById("mapModal");
const locationStatus = document.getElementById("locationStatus");

const locationSearch = document.getElementById("locationSearch");
const searchLocationBtn = document.getElementById("searchLocationBtn");

const BFC_WHATSAPP_PHONE = "9193922241640";
const DELIVERY_CHARGE = 30;

let deliveryMap = null;
let deliveryMarker = null;

let selectedLat = 16.5062;
let selectedLng = 80.6480;

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

function openMapModal() {
  mapModal.classList.add("show");

  if (navigator.geolocation) {
    locationStatus.textContent = "Trying to open your current location...";
    locationStatus.className = "location-status";

    navigator.geolocation.getCurrentPosition(
      position => {
        selectedLat = position.coords.latitude;
        selectedLng = position.coords.longitude;

        loadMap();

        locationStatus.textContent = "Map opened near your current location. Drag pin if needed.";
        locationStatus.className = "location-status success";
      },
      error => {
        loadMap();

        locationStatus.textContent = "Could not get current location. Search your area and drag the pin.";
        locationStatus.className = "location-status error";
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    loadMap();

    locationStatus.textContent = "Location not supported. Search your area and drag the pin.";
    locationStatus.className = "location-status error";
  }
}

function loadMap() {
  setTimeout(() => {
    if (!deliveryMap) {
      deliveryMap = L.map("deliveryMap").setView([selectedLat, selectedLng], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
      }).addTo(deliveryMap);

      deliveryMarker = L.marker([selectedLat, selectedLng], {
        draggable: true
      }).addTo(deliveryMap);

      deliveryMarker.on("dragend", () => {
        const position = deliveryMarker.getLatLng();
        selectedLat = position.lat;
        selectedLng = position.lng;
      });

      deliveryMap.on("click", e => {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;
        deliveryMarker.setLatLng([selectedLat, selectedLng]);
      });
    } else {
      deliveryMap.setView([selectedLat, selectedLng], 16);
      deliveryMarker.setLatLng([selectedLat, selectedLng]);
    }

    deliveryMap.invalidateSize();
  }, 250);
}

function closeMapModal() {
  mapModal.classList.remove("show");
}

function confirmLocation() {
  if (!deliveryMarker) {
    alert("Please select your delivery location.");
    return;
  }

  const position = deliveryMarker.getLatLng();

  selectedLat = position.lat;
  selectedLng = position.lng;

  const mapLink = `https://maps.google.com/?q=${selectedLat},${selectedLng}`;

  CUSTOMER_LOCATION_LINK.value = mapLink;

  locationStatus.innerHTML = `
    ✅ Location selected:
    <br>
    <a href="${mapLink}" target="_blank">${mapLink}</a>
  `;

  locationStatus.className = "location-status success";

  closeMapModal();
}

async function searchLocation() {
  const query = locationSearch.value.trim();

  if (!query) {
    alert("Please enter a location to search.");
    return;
  }

  try {
    searchLocationBtn.textContent = "Searching...";
    searchLocationBtn.disabled = true;

    const searchQuery = `${query}, Andhra Pradesh, India`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(searchQuery)}`
    );

    const results = await response.json();

    if (!results || results.length === 0) {
      alert("Location not found. Try searching a nearby landmark.");
      return;
    }

    selectedLat = parseFloat(results[0].lat);
    selectedLng = parseFloat(results[0].lon);

    if (!deliveryMap) {
      loadMap();
      return;
    }

    deliveryMap.setView([selectedLat, selectedLng], 17);
    deliveryMarker.setLatLng([selectedLat, selectedLng]);
  } catch (error) {
    alert("Unable to search location. Please try again.");
  } finally {
    searchLocationBtn.textContent = "Search";
    searchLocationBtn.disabled = false;
  }
}

if (openMapBtn) {
  openMapBtn.addEventListener("click", openMapModal);
}

if (closeMapBtn) {
  closeMapBtn.addEventListener("click", closeMapModal);
}

if (confirmLocationBtn) {
  confirmLocationBtn.addEventListener("click", confirmLocation);
}

if (searchLocationBtn) {
  searchLocationBtn.addEventListener("click", searchLocation);
}

if (locationSearch) {
  locationSearch.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchLocation();
    }
  });
}

if (mapModal) {
  mapModal.addEventListener("click", e => {
    if (e.target === mapModal) {
      closeMapModal();
    }
  });
}

function getFinalTotal() {
  const foodTotal = getCartTotal();

  if (foodTotal <= 0) return 0;

  return foodTotal + DELIVERY_CHARGE;
}

function renderCheckout() {
  const cart = getCart();

  if (cart.length === 0) {
    emptyCheckout.classList.add("show");
    checkoutForm.classList.add("hide");

    summaryItems.innerHTML = `<p class="empty-summary">No items selected</p>`;
    summaryTotal.textContent = "₹0";

    updateCartCount();
    return;
  }

  emptyCheckout.classList.remove("show");
  checkoutForm.classList.remove("hide");

  summaryItems.innerHTML = cart.map((item, index) => `
    <div class="summary-item">
      <h3>${index + 1}. ${item.name}</h3>
      ${item.size ? `<p>Size: ${item.size}</p>` : ""}
      ${item.detail ? `<p>${item.detail}</p>` : ""}
      <p>Quantity: x${item.quantity}</p>
      <strong>${item.price === 0 ? "FREE" : "₹" + item.price * item.quantity}</strong>
    </div>
  `).join("");

  summaryItems.innerHTML += `
    <div class="summary-item">
      <h3>Delivery Charge</h3>
      <p>Fixed delivery fee</p>
      <strong>₹${DELIVERY_CHARGE}</strong>
    </div>
  `;

  summaryTotal.textContent = `₹${getFinalTotal()}`;
  updateCartCount();
}

function validateForm() {
  const name = CUSTOMER_NAME.value.trim();
  const phone = CUSTOMER_PHONE.value.trim();
  const address = CUSTOMER_ADDRESS.value.trim();
  const landmark = CUSTOMER_LANDMARK.value.trim();
  const locationLink = CUSTOMER_LOCATION_LINK.value.trim();
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !phone || !address || !payment) {
    alert("Please fill all required fields.");
    return false;
  }

  if (phone.length < 10) {
    alert("Please enter a valid phone number.");
    return false;
  }

  if (!locationLink) {
    alert("Please select delivery location on map.");
    return false;
  }

  return true;
}

function createWhatsAppMessage() {
  const cart = getCart();

  const name = CUSTOMER_NAME.value.trim();
  const phone = CUSTOMER_PHONE.value.trim();
  const address = CUSTOMER_ADDRESS.value.trim();
  const landmark = CUSTOMER_LANDMARK.value.trim();
  const locationLink = CUSTOMER_LOCATION_LINK.value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  const orderItems = cart.map((item, index) => {
    const sizeText = item.size ? ` (${item.size})` : "";

    const priceText =
      item.price === 0
        ? "FREE"
        : `₹${item.price * item.quantity}`;

    return `${index + 1}️⃣ ${item.name}${sizeText}
• Qty: ${item.quantity}
• Price: ${priceText}`;
  }).join("\n\n");

  return `🍗 NEW B.F.C ORDER

━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━

Name: ${name}
Phone: ${phone}

📍 Delivery Address:
${address}

${landmark ? `📌 Landmark:
${landmark}

` : ""}📍 Map Location:
${locationLink}

━━━━━━━━━━━━━━
🛒 ORDER ITEMS
━━━━━━━━━━━━━━

${orderItems}

━━━━━━━━━━━━━━
💰 BILL SUMMARY
━━━━━━━━━━━━━━

Food Total      : ₹${getCartTotal()}
Delivery Charge : ₹${DELIVERY_CHARGE}

Grand Total     : ₹${getFinalTotal()}

━━━━━━━━━━━━━━
💳 PAYMENT
━━━━━━━━━━━━━━

${payment}

Thank you for ordering from B.F.C ❤️`;
}
checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    alert("No items selected.");
    window.location.href = "menu.html";
    return;
  }

  if (!validateForm()) return;

  const message = createWhatsAppMessage();

  window.open(
    "https://wa.me/" +
      BFC_WHATSAPP_PHONE +
      "?text=" +
      encodeURIComponent(message),
    "_blank"
  );

  clearCart();
  renderCheckout();
  updateCartCount();
});

renderCheckout();
updateCartCount();
