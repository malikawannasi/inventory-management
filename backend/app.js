const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

connectDB(); // Connexion à la base de données MongoDB

app.use(cors());
app.use(express.json()); // Pour que le serveur puisse comprendre les requêtes JSON

app.use('/api', productRoutes); // Utilisation des routes pour les produits

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
