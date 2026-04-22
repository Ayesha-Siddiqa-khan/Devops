import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="badge">New Season Collection</span>
        <h2>Boutique style, delivered to your doorstep.</h2>
        <p>
          Explore premium dresses, handbags, shoes, skincare and accessories crafted for modern everyday luxury.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="primary-btn">
            Shop Now
          </Link>
          <Link to="/cart" className="ghost-btn">
            View Cart
          </Link>
        </div>
        <div className="hero-metrics">
          <article>
            <strong>2K+</strong>
            <span>Monthly orders</span>
          </article>
          <article>
            <strong>24h</strong>
            <span>Fast dispatch</span>
          </article>
          <article>
            <strong>4.9/5</strong>
            <span>Customer rating</span>
          </article>
        </div>
      </div>
      <div className="hero-card">
        <h3>Top Categories</h3>
        <ul>
          <li>Dresses</li>
          <li>Handbags</li>
          <li>Shoes</li>
          <li>Skincare</li>
          <li>Accessories</li>
        </ul>
        <p className="muted">Handpicked drops refreshed every week.</p>
      </div>
    </section>
  );
}

export default HomePage;
