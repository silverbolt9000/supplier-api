// Importar o mongoose no início do arquivo
const mongoose = require('mongoose');

// Definir o schema do produto
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    productDescription: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0
    },
    productImage: {
        type: String, // URL opcional
        default: null
    },
    products: [{
        name: String,
        price: Number,
        quantity: Number
    }]
});

// Criar o modelo baseado no schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
