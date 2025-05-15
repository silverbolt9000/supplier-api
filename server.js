const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const traceRoutes = require('./routes/traceRoutes');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializar o Express
const app = express();
app.use(express.json());

// Rotas da API
app.use('/api', supplierRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api', traceRoutes);

// Conectar ao MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('Erro: A variável de ambiente MONGO_URI não está definida.');
    process.exit(1); // Encerra o processo se a URI não estiver definida
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});