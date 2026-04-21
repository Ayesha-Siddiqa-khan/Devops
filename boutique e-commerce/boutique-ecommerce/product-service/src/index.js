const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4002;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://boutique:boutique@postgres-service:5432/boutiquedb"
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const countResult = await pool.query("SELECT COUNT(*)::INT AS count FROM products");
  if (countResult.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO products(name, category, description, price, image_url)
      VALUES
        ('Silk Evening Dress', 'dresses', 'Elegant silk evening dress for special occasions.', 129.99, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'),
        ('Leather Handbag', 'handbags', 'Premium leather handbag with minimalist design.', 89.50, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c'),
        ('Classic Heels', 'shoes', 'Comfortable and stylish classic heels.', 69.00, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2'),
        ('Hydrating Serum', 'skincare', 'Daily hydrating serum for glowing skin.', 39.99, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883'),
        ('Gold Necklace', 'accessories', 'Delicate gold necklace for everyday style.', 54.95, 'https://images.unsplash.com/photo-1611085583191-a3b181a88401');
    `);
  }
}

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "product-service" });
});

app.get("/products", async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const result = await pool.query("SELECT * FROM products WHERE category = $1 ORDER BY id", [category]);
      return res.json(result.rows);
    }

    const result = await pool.query("SELECT * FROM products ORDER BY id");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch products", error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch product", error: error.message });
  }
});

init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Product service is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize product service", error);
    process.exit(1);
  });
