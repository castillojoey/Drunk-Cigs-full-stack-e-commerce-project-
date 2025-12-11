// assets/js/shop.js
const grid = document.getElementById("products-grid");
if (!grid) {
  console.error("No #products-grid element found on this page.");
} else {
  products.forEach((p, index) => {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = `product.html?id=${p.id}`;
    card.style.animationDelay = `${index * 80}ms`;
    card.style.textDecoration = "none";
    card.style.color = "inherit";

    const hasBack = !!p.imageBack;

    card.innerHTML = `
  ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}

  <div class="product-image-wrapper">
    <img
      src="${p.image}"
      alt="${p.name}"
      class="product-image"
      ${hasBack ? `data-front="${p.image}" data-back="${p.imageBack}"` : ""}
    >
  </div>

  <h3>${p.name}</h3>
  <p class="product-price">$${p.price.toFixed(2)}</p>
  <p class="product-description">${p.description}</p>
`;

    grid.appendChild(card);
  });

  // hover handlers stay the same
  grid.addEventListener("mouseover", (e) => {
    const img = e.target.closest("img[data-front][data-back]");
    if (!img) return;
    img.src = img.dataset.back;
  });

  grid.addEventListener("mouseout", (e) => {
    const img = e.target.closest("img[data-front][data-back]");
    if (!img) return;
    img.src = img.dataset.front;
  });
}
