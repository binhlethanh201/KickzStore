const Product = require("../models/Product");

class ProductController {
  async getAll(req, res, next) {
    try {
      const { brand, category, featured } = req.query;

      const filter = {};
      if (brand) filter.brand = brand;
      if (category) filter.category = category;
      if (featured) filter.isFeatured = featured === "true";

      const products = await Product.find(filter).sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: err.message });
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching product by ID", error: err.message });
    }
  }

  async search(req, res, next) {
    try {
      const query = req.query.q?.trim();
      if (!query) {
        return res.status(400).json({ message: "Missing search query" });
      }

      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      }).limit(20);

      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }

      res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error searching products", error: err.message });
    }
  }

  async getBrands(req, res, next) {
    try {
      const brands = await Product.distinct("brand");
      res.status(200).json(brands);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching brand list", error: err.message });
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await Product.distinct("category");
      res.status(200).json(categories);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching category list", error: err.message });
    }
  }
}

module.exports = new ProductController();
