const Supplier = require('../models/Supplier');

// Criar um novo supplier
exports.createSupplier = async (req, res) => {
    try {
        const { supplierName, supplierEmail, supplierPhone, supplierCNPJ } = req.body;

        // Validação de campos obrigatórios
        if (!supplierName || !supplierEmail || !supplierPhone || !supplierCNPJ) {

            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Verificar se o supplierEmail já está cadastrado
        const existingSupplier = await Supplier.findOne({ supplierEmail });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Email do fornecedor já cadastrado.' });
        }

        // Criar o supplier
        const newSupplier = new Supplier({ supplierName, supplierEmail, supplierPhone, supplierAddress, supplierCNPJ });
        await newSupplier.save();

        res.status(201).json({ message: 'Fornecedor criado com sucesso!', supplier: newSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar Fornecedor.', error: error.message });
    }
};

// Atualizar um supplier
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplierName, supplierEmail, supplierPhone, supplierAddress, supplierCNPJ } = req.body;

        // Verificar se o supplier existe
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Fornecedor não encontrado.' });
        }

        // Atualizar os campos
        supplier.supplierName = supplierName || supplier.supplierName;
        supplier.supplierEmail = supplierEmail || supplier.supplierEmail;
        supplier.supplierPhone = supplierPhone || supplier.supplierPhone;
        supplier.supplierAddress, supplierCNPJ = supplierAddress, supplierCNPJ || supplier.supplierAddress, supplierCNPJ;

        await supplier.save();

        res.status(200).json({ message: 'Fornecedor atualizado com sucesso!', supplier });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar Fornecedor.', error: error.message });
    }
};