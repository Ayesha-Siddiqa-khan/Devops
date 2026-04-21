import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const USER_ID = 1;

function CartPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [items]
  );

  const loadCart = () => {
    setLoading(true);
    api
      .cart(USER_ID)
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const changeQuantity = async (itemId, quantity) => {
    try {
      await api.updateCartItem(itemId, quantity);
      loadCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.removeCartItem(itemId);
      loadCart();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <section>
      <h2>Your Cart</h2>
      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p>
          Cart is empty. <Link to="/products">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.product_name}</h3>
                  <p>${Number(item.price).toFixed(2)}</p>
                </div>
                <div className="actions">
                  <button onClick={() => changeQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link className="primary-btn" to="/checkout">
            Proceed to Checkout
          </Link>
        </>
      )}
    </section>
  );
}

export default CartPage;
