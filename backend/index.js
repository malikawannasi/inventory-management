const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');  // Import des routes pour les produits

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://oiannacimlykh:gYMB8OiKLELeVv6h@cluster0.d3smm.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Utilisation des routes des produits avec le préfixe "/api"
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
