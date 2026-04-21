import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .products()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h2>Products</h2>
      <div className="grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <strong>${Number(product.price).toFixed(2)}</strong>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
