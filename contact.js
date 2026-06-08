// contact.js
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const faqItems = document.querySelectorAll(".faq-item");

const WHATSAPP_NUMBER = "918309073135";

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const whatsappMessage =
`Hello B.F.C

Name:
${name}

Phone:
${phone}

Message:
${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, "_blank");
  });
}

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

updateCartCount();