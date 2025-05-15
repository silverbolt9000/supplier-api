const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Lista de pedidos
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar pedido único
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Pedido não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Incluir pedido
router.post('/orders', async (req, res) => {
    const { orderId, supplierId, products } = req.body;
    try {
        const newOrder = new Order({ orderId, supplierId, products });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
