const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find((p) => p.id === productId);
const container = document.getElementById("product-detail");

if (!product) {
  container.innerHTML = "<p>Product not found.</p>";
} else {
  container.innerHTML = `
    <div class="product-page">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>

      <label for="size">Select Size:</label>
      <select id="size">
        ${product.sizes
          .map((s) => `<option value="${s}">${s}</option>`)
          .join("")}
      </select>

      <button class="btn btn-primary" id="add-to-cart">
        Add to Cart
      </button>
    </div>
  `;
  const btn = document.getElementById("add-to-cart");
  btn.addEventListener("click", () => {
    const selectedSize = document.getElementById("size").value;
    addToCart(product.id, selectedSize, 1);
    showToast("Added to cart!");
  });
}
