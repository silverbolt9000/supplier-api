const express = require('express');
const Product = require('../models/Product'); // Corrigir o nome do modelo para ser consistente
const router = express.Router();
const mongoose = require('mongoose'); // Para validar o ObjectId
const Joi = require('joi'); // Biblioteca para validação de dados
const asyncHandler = require('express-async-handler'); // Para capturar erros de forma mais eficiente

// Middleware para validar o ID
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    next();
};

// Middleware para validar o produto no corpo da requisição
const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        productName: Joi.string().min(3).max(100).required(),
        productDescription: Joi.string().min(10).max(500).required(),
        productPrice: Joi.number().positive().required(),
        productImage: Joi.string().uri().optional(),
        products: Joi.array().optional() // Se for opcional
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


// Lista de produtos com paginação
router.get('/products', asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Paginação
    const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Product.countDocuments();
    res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
}));

// Buscar produto único
router.get('/products/:id', validateId, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
}));

// Incluir produto
router.post('/products', validateProduct, asyncHandler(async (req, res) => {
    const { productName, productDescription, productPrice, productImage } = req.body;

    // Certifique-se de que o modelo Product tenha esses campos
    const newProduct = new Product({
        productName,
        productDescription,
        productPrice,
        productImage
    });

    await newProduct.save();
    res.status(201).json(newProduct);
}));


// Middleware global de erro
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado no servidor!' });
});



module.exports = router;
