import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="hero">
      <div>
        <span className="badge">New Season Collection</span>
        <h2>Boutique style, delivered to your doorstep.</h2>
        <p>
          Explore premium dresses, handbags, shoes, skincare and accessories crafted for modern everyday luxury.
        </p>
        <Link to="/products" className="primary-btn">
          Shop Now
        </Link>
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
      </div>
    </section>
  );
}

export default HomePage;
