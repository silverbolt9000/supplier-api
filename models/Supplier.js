const mongoose = require('mongoose');

//esquema para busca de fornecedores e inclusão

const SupplierSchema = new mongoose.Schema({
    supplierName: { type: String, required: true },
    supplierCNPJ: { type: String, required: true },
    supplierPhone: { type: String, required: true },
    supplierEmail: { type: String, required: true },
    supplierImage: { type: String },
    supplierWhatsApp: { type: String },
    supplierAddress: { type: String },
    productType: { type: String },
    supplierDescription: { type: String },
    SupplierCreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
