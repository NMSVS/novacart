
import { useState } from "react";
import "./App.css";
import ProductCard from "./ProductCard";

function App() {
  const products = [
    {
      id: 1,
      name: "Sonic Headphones",
      price: 2499,
      category: "Electronics",
      badge: "BESTSELLER",
      description: "Immersive sound and all-day comfort.",
      emoji: "🎧",
    },
    {
      id: 2,
      name: "Nova Smart Watch",
      price: 3999,
      category: "Accessories",
      badge: "TRENDING",
      description: "Your personal fitness companion.",
      emoji: "⌚",
    },
    {
      id: 3,
      name: "Urban Sneakers",
      price: 1999,
      category: "Fashion",
      badge: "POPULAR",
      description: "Comfort meets everyday style.",
      emoji: "👟",
    },
    {
      id: 4,
      name: "Travel Backpack",
      price: 1499,
      category: "Lifestyle",
      badge: "NEW",
      description: "Carry your world everywhere.",
      emoji: "🎒",
    },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="logo">
          <span className="logo-mark">N</span>
          NovaCart
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">My Cart</a>
        </div>

        <a href="#cart" className="cart-nav">
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-label">✦ YOUR EVERYDAY MARKETPLACE</p>

          <h1>
            Shopping made
            <br />
            <span>extraordinary.</span>
          </h1>

          <p className="hero-description">
            Discover products you love. Find your style.
            Enjoy a smarter shopping experience.
          </p>

          <a href="#products" className="hero-btn">
            Explore Products ↗
          </a>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="hero-floating-card card-one">
            <span>🎧</span>
            <div>
              <strong>Trending now</strong>
              <small>Tech essentials</small>
            </div>
          </div>

          <div className="hero-floating-card card-two">
            <span>✨</span>
            <div>
              <strong>New collection</strong>
              <small>Explore something new</small>
            </div>
          </div>

          <div className="hero-center">
            <span>✦</span>
            <h2>Nova</h2>
            <p>DISCOVER MORE</p>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="section-label">CURATED FOR YOU</p>
            <h2>Explore our collection</h2>
          </div>

          <p className="product-count">
            {filteredProducts.length} products available
          </p>
        </div>

        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search your favorite products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          {[
            "All",
            "Electronics",
            "Fashion",
            "Accessories",
            "Lifestyle",
          ].map((item) => (
            <button
              key={item}
              className={`filter-btn ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="empty-products">
              <h3>No products found 😕</h3>
              <p>Try another search.</p>
            </div>
          )}
        </div>
      </section>

      <section className="cart-section" id="cart">
        <div className="section-heading">
          <div>
            <p className="section-label">YOUR SELECTION</p>
            <h2>Shopping cart</h2>
          </div>
          <p className="product-count">{cartCount} items</p>
        </div>

        <div className="cart-container">
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something you love to get started!</p>
                <a href="#products" className="continue-btn">
                  Explore products →
                </a>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-emoji">{item.emoji}</div>

                  <div className="cart-item-details">
                    <p className="category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <h3>Order summary</h3>

            <div className="summary-row">
              <span>Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="checkout-btn"
              disabled={cart.length === 0}
              onClick={() => {
                alert("Thank you for shopping with NovaCart! ✨");
                setCart([]);
              }}
            >
              Checkout →
            </button>

            <p className="secure-note">🔒 Secure & simple shopping</p>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-mark">N</span>
          NovaCart
        </a>

        <p>Discover more. Shop smarter. ✦</p>
        <span className="footer-copy">
          © 2026 NovaCart. Built with React.
        </span>
      </footer>
    </div>
  );
}

export default App;
