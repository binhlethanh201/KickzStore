const Product = require('../models/Product')
class ProductController{
    async getAll(req, res, next) {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: 'Error', error: err.message })
        }
    }
    async getById(req, res, next) {
        try {
          const { id } = req.params
          const product = await Product.findById(id)
          if (!product) {
            return res.status(404).json({ message: 'Product not found' })
          }
          res.status(200).json(product)
        } catch (err) {
          res.status(500).json({ message: 'Error fetching product by ID', error: err.message })
        }
      }
      
      async search(req, res, next) {
        try {
          const query = req.query.q?.trim()
          if (!query) {
            return res.status(400).json({ message: 'Missing search query' })
          }
    
          const products = await Product.find({
            $or: [
              { name: { $regex: query, $options: 'i' } },  
              { brand: { $regex: query, $options: 'i' } },  
            ],
          }).limit(20) 
    
          res.status(200).json(products)
        } catch (err) {
          res.status(500).json({ message: 'Error searching products', error: err.message })
        }
      }
    
}
module.exports = new ProductController()