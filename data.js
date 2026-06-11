// data.js

const BFC_GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7p6jb1w_zS_1NI-AZHp5SrssHLNPY5wsiLt-ZdldicYX0uYc1k4pA7NyQazEPH8kWynTs3IsR7Ai0/pub?output=csv";

const LOCAL_IMAGE_FOLDER = "images/menu/";
const DEFAULT_FOOD_IMAGE =
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800";

var menuItems = [];

const IMAGE_LIBRARY = {
  chicken:
    "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
  friedChicken:
    "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
  wings:
    "https://images.pexels.com/photos/13999297/pexels-photo-13999297.jpeg?auto=compress&cs=tinysrgb&w=800",
  popcornChicken:
    "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=800",
  strips:
    "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
  fish:
    "https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=800",
  pizza:
    "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800",
  vegPizza:
    "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800",
  chickenPizza:
    "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800",
  burger:
    "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
  vegBurger:
    "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=800",
  chickenBurger:
    "https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg?auto=compress&cs=tinysrgb&w=800",
  sandwich:
    "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=800",
  fries:
    "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
  combo:
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
    shawarma:
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=800&fit=crop",

waffle:
  "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=800&fit=crop",

momos:
  "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&h=800&fit=crop",
};

function getSmartImage(name, category) {
  const text = `${name || ""} ${category || ""}`.toLowerCase();

  if (text.includes("popcorn") && text.includes("chicken")) return IMAGE_LIBRARY.popcornChicken;
  if (text.includes("wings")) return IMAGE_LIBRARY.wings;
  if (text.includes("strip")) return IMAGE_LIBRARY.strips;
  if (text.includes("fish")) return IMAGE_LIBRARY.fish;
  if (text.includes("fried chicken") || text.includes("lolipop") || text.includes("lollipop")) return IMAGE_LIBRARY.friedChicken;

  if (text.includes("pizza") && text.includes("chicken")) return IMAGE_LIBRARY.chickenPizza;
  if (text.includes("pizza") && text.includes("veg")) return IMAGE_LIBRARY.vegPizza;
  if (text.includes("pizza")) return IMAGE_LIBRARY.pizza;

  if (text.includes("burger") && text.includes("chicken")) return IMAGE_LIBRARY.chickenBurger;
  if (text.includes("burger") && text.includes("veg")) return IMAGE_LIBRARY.vegBurger;
  if (text.includes("burger")) return IMAGE_LIBRARY.burger;

  if (text.includes("sandwich")) return IMAGE_LIBRARY.sandwich;
if (text.includes("fries")) return IMAGE_LIBRARY.fries;
if (text.includes("combo")) return IMAGE_LIBRARY.combo;

if (text.includes("shawarma")) return IMAGE_LIBRARY.shawarma;
if (text.includes("waffle")) return IMAGE_LIBRARY.waffle;
if (text.includes("momos")) return IMAGE_LIBRARY.momos;

return DEFAULT_FOOD_IMAGE;
}

function cleanImageUrl(image, name = "", category = "") {
  const value = String(image || "").trim();

  if (!value) {
    return getSmartImage(name, category);
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (
    value.startsWith("images/") ||
    value.startsWith("./images/") ||
    value.startsWith("../images/")
  ) {
    return value;
  }

  return `${LOCAL_IMAGE_FOLDER}${value}`;
}

const fallbackMenuItems = [
  {
    id: 1,
    name: "Chicken Popcorn",
    category: "Fried Chicken",
    image: getSmartImage("Chicken Popcorn", "Fried Chicken"),
    description: "Crispy bite sized chicken pieces.",
    popular: true,
    sizes: [
      { name: "Regular", detail: "130gm", price: 120 },
      { name: "Medium", detail: "250gm", price: 200 },
      { name: "Large", detail: "350gm", price: 300 }
    ]
  },
  {
    id: 2,
    name: "Boneless Strips",
    category: "Fried Chicken",
    image: getSmartImage("Boneless Strips", "Fried Chicken"),
    description: "Juicy crispy boneless chicken strips.",
    popular: true,
    sizes: [
      { name: "Regular", detail: "4 pcs", price: 140 },
      { name: "Medium", detail: "8 pcs", price: 270 },
      { name: "Large", detail: "12 pcs", price: 380 }
    ]
  },
  {
    id: 3,
    name: "Crispy Wings",
    category: "Fried Chicken",
    image: getSmartImage("Crispy Wings", "Fried Chicken"),
    description: "Hot crispy chicken wings.",
    popular: true,
    sizes: [
      { name: "Regular", detail: "5 pcs", price: 120 },
      { name: "Medium", detail: "10 pcs", price: 220 },
      { name: "Large", detail: "15 pcs", price: 320 }
    ]
  },
  {
    id: 4,
    name: "Crispy Fried Chicken",
    category: "Fried Chicken",
    image: getSmartImage("Crispy Fried Chicken", "Fried Chicken"),
    description: "Classic crispy fried chicken.",
    popular: true,
    sizes: [
      { name: "Regular", detail: "2 pcs", price: 120 },
      { name: "Medium", detail: "4 pcs", price: 260 },
      { name: "Large", detail: "8 pcs", price: 480 }
    ]
  },
  {
    id: 5,
    name: "Chicken Lolipop",
    category: "Fried Chicken",
    image: getSmartImage("Chicken Lolipop", "Fried Chicken"),
    description: "Spicy crispy chicken lolipop.",
    popular: true,
    sizes: [
      { name: "Regular", detail: "4 pcs", price: 120 },
      { name: "Medium", detail: "8 pcs", price: 250 },
      { name: "Large", detail: "12 pcs", price: 370 }
    ]
  },
  {
    id: 6,
    name: "BFC SPL Fish Popcorn",
    category: "Fried Chicken",
    image: getSmartImage("Fish Popcorn", "Fried Chicken"),
    description: "Crispy fish popcorn bites.",
    sizes: [
      { name: "Regular", detail: "120gm", price: 180 },
      { name: "Medium", detail: "210gm", price: 360 },
      { name: "Large", detail: "310gm", price: 480 }
    ]
  },
  {
    id: 7,
    name: "Chicken Pizza",
    category: "Pizza",
    image: getSmartImage("Chicken Pizza", "Pizza"),
    description: "Cheesy chicken pizza.",
    popular: true,
    sizes: [
      { name: "Small", price: 170 },
      { name: "Medium", price: 220 }
    ]
  },
  {
    id: 8,
    name: "Crispy Chicken Pizza",
    category: "Pizza",
    image: getSmartImage("Crispy Chicken Pizza", "Pizza"),
    description: "Pizza with crispy chicken topping.",
    popular: true,
    sizes: [
      { name: "Small", price: 200 },
      { name: "Medium", price: 270 }
    ]
  },
  {
    id: 9,
    name: "BFC Special Pizza",
    category: "Pizza",
    image: getSmartImage("BFC Special Pizza", "Pizza"),
    description: "B.F.C signature special pizza.",
    popular: true,
    sizes: [
      { name: "Small", price: 200 },
      { name: "Medium", price: 260 }
    ]
  },
  {
    id: 10,
    name: "BFC Bread Pizza",
    category: "Pizza",
    image: getSmartImage("BFC Bread Pizza", "Pizza"),
    description: "Crispy bread pizza with rich toppings.",
    sizes: [
      { name: "Small", price: 100 },
      { name: "Medium", price: 120 }
    ]
  },
  {
    id: 11,
    name: "Chicken Khaima Pizza",
    category: "Pizza",
    image: getSmartImage("Chicken Khaima Pizza", "Pizza"),
    description: "Chicken khaima loaded pizza.",
    sizes: [
      { name: "Small", price: 180 },
      { name: "Medium", price: 220 }
    ]
  },
  {
    id: 12,
    name: "Double Cheese Double Chik Pizza",
    category: "Pizza",
    image: getSmartImage("Double Cheese Chicken Pizza", "Pizza"),
    description: "Extra cheese pizza with double chicken.",
    sizes: [
      { name: "Small", price: 250 },
      { name: "Medium", price: 320 }
    ]
  },
  {
    id: 13,
    name: "Veg Pizza",
    category: "Pizza",
    image: getSmartImage("Veg Pizza", "Pizza"),
    description: "Fresh vegetable pizza.",
    sizes: [
      { name: "Small", price: 100 },
      { name: "Medium", price: 150 }
    ]
  },
  {
    id: 14,
    name: "Veg Corn Pizza",
    category: "Pizza",
    image: getSmartImage("Veg Corn Pizza", "Pizza"),
    description: "Cheesy corn pizza.",
    sizes: [
      { name: "Small", price: 120 },
      { name: "Medium", price: 180 }
    ]
  },
  {
    id: 15,
    name: "Veg Cheese Pizza",
    category: "Pizza",
    image: getSmartImage("Veg Cheese Pizza", "Pizza"),
    description: "Loaded cheese veg pizza.",
    sizes: [
      { name: "Small", price: 150 },
      { name: "Medium", price: 200 }
    ]
  },
  {
    id: 16,
    name: "Veg Paneer Pizza",
    category: "Pizza",
    image: getSmartImage("Veg Paneer Pizza", "Pizza"),
    description: "Paneer loaded pizza.",
    sizes: [
      { name: "Small", price: 150 },
      { name: "Medium", price: 200 }
    ]
  },
  {
    id: 17,
    name: "Chicken Burger",
    category: "Burger",
    price: 110,
    image: getSmartImage("Chicken Burger", "Burger"),
    description: "Fresh chicken burger.",
    popular: true
  },
  {
    id: 18,
    name: "Chicken Cheese Burger",
    category: "Burger",
    price: 120,
    image: getSmartImage("Chicken Cheese Burger", "Burger"),
    description: "Chicken burger with cheese."
  },
  {
    id: 19,
    name: "Chicken Popcorn Burger",
    category: "Burger",
    price: 130,
    image: getSmartImage("Chicken Popcorn Burger", "Burger"),
    description: "Burger loaded with crispy chicken popcorn."
  },
  {
    id: 20,
    name: "Chicken Strip Burger",
    category: "Burger",
    price: 150,
    image: getSmartImage("Chicken Strip Burger", "Burger"),
    description: "Burger with crispy chicken strip."
  },
  {
    id: 21,
    name: "Veg Burger",
    category: "Burger",
    price: 80,
    image: getSmartImage("Veg Burger", "Burger"),
    description: "Classic veg burger."
  },
  {
    id: 22,
    name: "Veg Cheese Burger",
    category: "Burger",
    price: 100,
    image: getSmartImage("Veg Cheese Burger", "Burger"),
    description: "Veg burger with cheese."
  },
  {
    id: 23,
    name: "Paneer Burger",
    category: "Burger",
    price: 100,
    image: getSmartImage("Paneer Burger", "Burger"),
    description: "Paneer loaded burger."
  },
  {
    id: 24,
    name: "French Fries",
    category: "Burger",
    image: getSmartImage("French Fries", "Burger"),
    description: "Crispy golden french fries.",
    sizes: [
      { name: "Regular", price: 80 },
      { name: "Medium", price: 100 },
      { name: "Large", price: 120 }
    ]
  },
  {
    id: 25,
    name: "Chicken Sandwich",
    category: "Sandwich",
    price: 110,
    image: getSmartImage("Chicken Sandwich", "Sandwich"),
    description: "Fresh chicken sandwich.",
    popular: true
  },
  {
    id: 26,
    name: "Chicken Cheese Sandwich",
    category: "Sandwich",
    price: 120,
    image: getSmartImage("Chicken Cheese Sandwich", "Sandwich"),
    description: "Chicken cheese sandwich."
  },
  {
    id: 27,
    name: "Chicken Grill Sandwich",
    category: "Sandwich",
    price: 160,
    image: getSmartImage("Chicken Grill Sandwich", "Sandwich"),
    description: "Grilled chicken sandwich."
  },
  {
    id: 28,
    name: "Chicken Cheese Grill Sandwich",
    category: "Sandwich",
    price: 180,
    image: getSmartImage("Chicken Cheese Grill Sandwich", "Sandwich"),
    description: "Grilled chicken cheese sandwich."
  },
  {
    id: 29,
    name: "Chicken Khaima Sandwich",
    category: "Sandwich",
    price: 110,
    image: getSmartImage("Chicken Khaima Sandwich", "Sandwich"),
    description: "Chicken khaima sandwich."
  },
  {
    id: 30,
    name: "Chicken Khaima Cheese Sandwich",
    category: "Sandwich",
    price: 120,
    image: getSmartImage("Chicken Khaima Cheese Sandwich", "Sandwich"),
    description: "Chicken khaima sandwich with cheese."
  },
  {
    id: 31,
    name: "Chicken Popcorn Sandwich",
    category: "Sandwich",
    price: 120,
    image: getSmartImage("Chicken Popcorn Sandwich", "Sandwich"),
    description: "Sandwich with crispy chicken popcorn."
  },
  {
    id: 32,
    name: "2 Layer Chicken Sandwich",
    category: "Sandwich",
    price: 160,
    image: getSmartImage("2 Layer Chicken Sandwich", "Sandwich"),
    description: "Double layer chicken sandwich."
  },
  {
    id: 33,
    name: "3 Layer Chicken Sandwich",
    category: "Sandwich",
    price: 180,
    image: getSmartImage("3 Layer Chicken Sandwich", "Sandwich"),
    description: "Triple layer chicken sandwich."
  },
  {
    id: 34,
    name: "3 Layer Chicken Cheese Sandwich",
    category: "Sandwich",
    price: 200,
    image: getSmartImage("3 Layer Chicken Cheese Sandwich", "Sandwich"),
    description: "Triple layer chicken sandwich with cheese."
  },
  {
    id: 35,
    name: "Veg Sandwich",
    category: "Sandwich",
    price: 60,
    image: getSmartImage("Veg Sandwich", "Sandwich"),
    description: "Fresh veg sandwich."
  },
  {
    id: 36,
    name: "Veg Cheese Grill Sandwich",
    category: "Sandwich",
    price: 80,
    image: getSmartImage("Veg Cheese Grill Sandwich", "Sandwich"),
    description: "Grilled veg cheese sandwich."
  },
  {
    id: 37,
    name: "Paneer Sandwich",
    category: "Sandwich",
    price: 100,
    image: getSmartImage("Paneer Sandwich", "Sandwich"),
    description: "Paneer sandwich."
  },
  {
    id: 38,
    name: "Cheese Paneer Grill Sandwich",
    category: "Sandwich",
    price: 120,
    image: getSmartImage("Cheese Paneer Grill Sandwich", "Sandwich"),
    description: "Grilled paneer cheese sandwich."
  },
  {
    id: 39,
    name: "Veg Overload",
    category: "Sandwich",
    price: 130,
    image: getSmartImage("Veg Overload", "Sandwich"),
    description: "Loaded veg sandwich."
  },
  {
    id: 40,
    name: "Fried Combo 1",
    category: "Combos",
    price: 209,
    image: getSmartImage("Fried Combo", "Combos"),
    description: "Popcorn regular, wings 5 pcs and legs 2 pcs."
  },
  {
    id: 41,
    name: "Fried Combo 2",
    category: "Combos",
    price: 409,
    image: getSmartImage("Fried Combo", "Combos"),
    description: "Popcorn medium, lolipop 4 pcs and strips 4 pcs."
  },
  {
    id: 42,
    name: "Fried Combo 3",
    category: "Combos",
    price: 509,
    image: getSmartImage("Fried Combo", "Combos"),
    description: "Popcorn medium, legs 4 pcs and wings 4 pcs."
  },
  {
    id: 43,
    name: "Fried Combo 4",
    category: "Combos",
    price: 799,
    image: getSmartImage("Fried Combo", "Combos"),
    description: "Strips 8 pcs, legs 4 pcs, lolipops 6 pcs and popcorn medium."
  },
  {
    id: 44,
    name: "Fried Combo 5",
    category: "Combos",
    price: 999,
    image: getSmartImage("Fried Combo", "Combos"),
    description: "Strips 8 pcs, legs 4 pcs, lolipops 8 pcs and wings 4 pcs."
  },
  {
    id: 45,
    name: "Pizza Combo 1",
    category: "Combos",
    price: 299,
    image: getSmartImage("Pizza Combo", "Combos"),
    description: "Chicken pizza medium and chicken cheese sandwich."
  },
  {
    id: 46,
    name: "Pizza Combo 2",
    category: "Combos",
    price: 499,
    image: getSmartImage("Pizza Combo", "Combos"),
    description: "Chicken pizza small, chicken pizza medium, chicken sandwich and veg sandwich."
  },
  {
    id: 47,
    name: "Pizza Combo 3",
    category: "Combos",
    price: 799,
    image: getSmartImage("Pizza Combo", "Combos"),
    description: "Chicken pizza medium 3 pcs and chicken burger 2 pcs."
  },
  {
    id: 48,
    name: "Pizza Combo 4",
    category: "Combos",
    price: 849,
    image: getSmartImage("Pizza Combo", "Combos"),
    description: "Chicken pizza medium 2 pcs, paneer pizza medium, chicken cheese burger 2 pcs and paneer sandwich."
  }
];

function isTrue(value) {
  const text = String(value || "").trim().toLowerCase();
  return text === "true" || text === "yes" || text === "1" || text === "available";
}

function toNumber(value) {
  const num = Number(String(value || "").replace(/[₹,\s]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (value || row.length) {
        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      }

      if (char === "\r" && nextChar === "\n") i++;
      continue;
    }

    value += char;
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map(header =>
    String(header || "").trim().toLowerCase()
  );

  return rows.slice(1).map(row => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] ? row[index].trim() : "";
    });

    return obj;
  });
}

function normalizeSheetItem(row, index) {
  const id = row.id || String(index + 1);
  const name = row.name;
  const category = row.category;
  const description = row.description || "";
  const available = row.available === "" ? true : isTrue(row.available);
  const popular = isTrue(row.popular);

  if (!name || !category || !available) return null;

  const image = cleanImageUrl(row.image, name, category);
  const sizes = [];

  for (let i = 1; i <= 3; i++) {
    const sizeName = row[`size_${i}_name`];
    const sizeDetail = row[`size_${i}_detail`];
    const sizePrice = toNumber(row[`size_${i}_price`]);

    if (sizeName && sizePrice > 0) {
      sizes.push({
        name: sizeName,
        detail: sizeDetail,
        price: sizePrice
      });
    }
  }

  const item = {
    id,
    name,
    category,
    image,
    description,
    popular
  };

  if (sizes.length > 0) {
    item.sizes = sizes;
  } else {
    item.price = toNumber(row.price);
  }

  if (!item.sizes && (!item.price || item.price <= 0)) {
    return null;
  }

  return item;
}

async function loadMenuItemsFromSheet() {
  if (!BFC_GOOGLE_SHEET_CSV_URL.trim()) {
    menuItems = fallbackMenuItems;
    window.menuItems = menuItems;
    return menuItems;
  }

  try {
    const separator = BFC_GOOGLE_SHEET_CSV_URL.includes("?") ? "&" : "?";
    const url = `${BFC_GOOGLE_SHEET_CSV_URL}${separator}cacheBust=${Date.now()}`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Google Sheet fetch failed");
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    const objects = rowsToObjects(rows);

    const sheetItems = objects
      .map(normalizeSheetItem)
      .filter(Boolean);

    menuItems = sheetItems.length ? sheetItems : fallbackMenuItems;
    window.menuItems = menuItems;

    return menuItems;
  } catch (error) {
    console.warn("Using fallback menu because Google Sheet failed:", error);
    menuItems = fallbackMenuItems;
    window.menuItems = menuItems;
    return menuItems;
  }
}

window.menuDataReady = loadMenuItemsFromSheet();
