const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../data/products.json");

const readDB = () => {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
};

// GET /api/products
router.get("/", (req, res) => {
  try {
    const { category, search, sort, featured, sale, newArrival, page = 1, limit = 12 } = req.query;
    let { products } = readDB();

    if (category && category !== "All") {
      products = products.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (featured === "true") products = products.filter((p) => p.featured);
    if (sale === "true") products = products.filter((p) => p.sale);
    if (newArrival === "true") products = products.filter((p) => p.new);

    if (sort) {
      switch (sort) {
        case "price_asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          products.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
          break;
        default:
          break;
      }
    }

    const total = products.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = products.slice(start, start + parseInt(limit));

    res.json({
      products: paginated,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/meta
router.get("/meta", (req, res) => {
  try {
    const { categories, brands } = readDB();
    res.json({ categories, brands });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  try {
    const { products } = readDB();
    const product = products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    res.json({ product, related });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
