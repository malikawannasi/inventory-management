const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

// Créer un produit
router.post('/products', createProduct);

// Lire tous les produits
router.get('/products', getProducts);

router.get('/products/:id', getProductById); 

// Supprimer un produit par ID
router.delete('/products/:id', deleteProduct);

// Mettre à jour un produit par ID
router.put('/products/:id', updateProduct);

module.exports = router;
