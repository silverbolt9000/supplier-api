const mongoose = require('mongoose');
const express = require('express');
const Supplier = require('../models/Supplier');
const router = express.Router();
const Joi = require('joi'); // Biblioteca de validação
const asyncHandler = require('express-async-handler'); // Captura erros async
const supplierController = require('../controllers/SupplierController'); // Importar o controller de fornecedores

// Middleware para validar dados do fornecedor
const validateSupplier = (req, res, next) => {
    const schema = Joi.object({
        supplierName: Joi.string().min(3).max(100).required(),
        supplierCNPJ: Joi.string().pattern(/^\d{14}$/).required(), // CNPJ com 14 dígitos
        supplierPhone: Joi.string().min(10).max(15).required(),
        supplierEmail: Joi.string().email().required(),
        supplierWhatsApp: Joi.string().optional(),
        productType: Joi.string().optional(),
        supplierAddress: Joi.string().optional(),
        supplierDescription: Joi.string().optional(),
        supplierImage: Joi.string().uri().optional()

    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Cadastro de fornecedor
router.post('/suppliers', validateSupplier, asyncHandler(async (req, res) => {
    const { supplierName, supplierCNPJ, supplierPhone, supplierEmail, supplierImage } = req.body;

    const newSupplier = new Supplier({
        supplierName,
        supplierCNPJ,
        supplierPhone,
        supplierEmail,
        supplierImage
    });
    await newSupplier.save();

    res.status(201).json(newSupplier);
}));

// Consulta de fornecedores (com paginação)
router.get('/suppliers', asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Paginação com limite padrão de 10 itens
    const suppliers = await Supplier.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Supplier.countDocuments();

    res.json({
        suppliers,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
}));

// Consulta de fornecedor por ID
router.get('/suppliers/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (supplier) {
            res.json(supplier);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        res.status(500).json({ message: 'Erro interno ao buscar fornecedor' });
    }
});

// Rota para criar um novo supplier
router.post('/suppliers', supplierController.createSupplier);

// Rota para atualizar um supplier
router.put('/suppliers/:id', supplierController.updateSupplier);

// Middleware para tratar erros globais (opcional)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado no servidor!' });
});

module.exports = router;
