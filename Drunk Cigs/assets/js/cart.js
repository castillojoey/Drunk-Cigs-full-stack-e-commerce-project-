// assets/js/cart.js

// ---------- Cart storage helpers ----------

// ---------- Toast helper ----------

function showToast(message) {
  const container = document.getElementById("toast-container");

  // Fallback if container doesn't exist for some reason
  if (!container) {
    alert(message);
    return;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // hide after 2.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300); // wait for transition
  }, 2500);
}

function getCart() {
  const raw = localStorage.getItem("cart");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse cart from localStorage:", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, size, qty = 1) {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.productId === productId && item.size === size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, size, qty });
  }

  saveCart(cart);
}

// Update quantity (or remove if <= 0)
function updateCartItem(productId, size, newQty) {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId && i.size === size);
  if (!item) return;

  if (newQty <= 0) {
    const filtered = cart.filter(
      (i) => !(i.productId === productId && i.size === size)
    );
    saveCart(filtered);
  } else {
    item.qty = newQty;
    saveCart(cart);
  }
}

function removeFromCart(productId, size) {
  const cart = getCart().filter(
    (i) => !(i.productId === productId && i.size === size)
  );
  saveCart(cart);
}

// ---------- Rendering helpers ----------

// Render into any pair of container + total elements
function renderCartInto(itemsId, totalId) {
  const cart = getCart();
  const container = document.getElementById(itemsId);
  const totalEl = document.getElementById(totalId);

  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (!cart.length) {
    container.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    totalEl.textContent = "$0.00";
    return;
  }

  // Safely get product list (handles case where products isn't defined)
  const productList =
    typeof products !== "undefined" && Array.isArray(products) ? products : [];

  let total = 0;

  cart.forEach((item) => {
    const product = productList.find((p) => p.id === item.productId);
    if (!product) return;

    const price = product.price || 0;
    const lineTotal = price * item.qty;
    total += lineTotal;

    const imgSrc = product.imageBack || "";

    const wrapper = document.createElement("div");
    wrapper.className = "cart-item";
    wrapper.innerHTML = `
      <div class="cart-item-main">
        ${
          imgSrc
            ? `<img src="${imgSrc}" alt="${product.name}" class="cart-item-img" />`
            : ""
        }
        <div class="cart-item-info">
          <h3 class="cart-item-name">${product.name}</h3>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-price">$${price.toFixed(2)}</p>
        </div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-qty">
          <button type="button" class="cart-qty-btn" data-action="dec">-</button>
          <input
            type="number"
            min="1"
            value="${item.qty}"
            class="cart-qty-input"
          />
          <button type="button" class="cart-qty-btn" data-action="inc">+</button>
        </div>
        <p class="cart-item-line-total">$${lineTotal.toFixed(2)}</p>
        <button type="button" class="cart-remove-btn">Remove</button>
      </div>
    `;

    const decBtn = wrapper.querySelector('[data-action="dec"]');
    const incBtn = wrapper.querySelector('[data-action="inc"]');
    const qtyInput = wrapper.querySelector(".cart-qty-input");
    const removeBtn = wrapper.querySelector(".cart-remove-btn");

    const applyChange = (newQty) => {
      updateCartItem(item.productId, item.size, newQty);
      renderCart(); // re-render both places
    };

    decBtn.addEventListener("click", () => {
      applyChange(item.qty - 1);
    });

    incBtn.addEventListener("click", () => {
      applyChange(item.qty + 1);
    });

    qtyInput.addEventListener("change", () => {
      const val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) {
        applyChange(1);
      } else {
        applyChange(val);
      }
    });

    removeBtn.addEventListener("click", () => {
      removeFromCart(item.productId, item.size);
      renderCart();
    });

    container.appendChild(wrapper);
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Render both full-page cart and sidebar cart if they exist
function renderCart() {
  // full cart page
  renderCartInto("cart-items", "cart-total");
  // sidebar cart
  renderCartInto("cart-sidebar-items", "cart-sidebar-total");
}

// ---------- Wire everything up ----------

document.addEventListener("DOMContentLoaded", () => {
  // initial render (whatever elements exist on this page will be filled)
  renderCart();

  const openLinks = document.querySelectorAll("[data-open-cart]");
  const backdrop = document.getElementById("cart-sidebar-backdrop");
  const sidebar = document.getElementById("cart-sidebar");
  const closeBtn = document.getElementById("cart-sidebar-close");

  function openSidebar() {
    if (!backdrop || !sidebar) return;
    backdrop.classList.add("open");
    sidebar.classList.add("open");
    renderCart(); // refresh contents when opening
  }

  function closeSidebar() {
    if (!backdrop || !sidebar) return;
    backdrop.classList.remove("open");
    sidebar.classList.remove("open");
  }

  // ---- OPEN CART (smart behavior) ----
  openLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // If this page does NOT have the sidebar elements,
      // let the link behave normally and navigate to cart.html
      if (!sidebar || !backdrop) return;

      // If sidebar *does* exist, prevent navigation and open the drawer
      e.preventDefault();
      openSidebar();
    });
  });

  // ---- CLOSE CART (sidebar) ----
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeSidebar();
    });
  }
});
