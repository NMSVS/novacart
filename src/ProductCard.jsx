
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-art">
        <span className="product-emoji">{product.emoji}</span>
        <span className="product-badge">{product.badge}</span>
      </div>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>

        <div className="product-bottom">
          <div className="price">
            ₹{product.price.toLocaleString("en-IN")}
          </div>

          <button
            className="add-btn"
            onClick={() => onAddToCart(product)}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
