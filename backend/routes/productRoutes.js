const express = require('express');
const Product = require('../models/Product');  // Assure-toi que ton modèle Product est correct
const router = express.Router();

// Créer un produit
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lire tous les produits
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un produit par ID
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès', deletedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un produit par ID
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error: err.message });
  }
});

module.exports = router;



