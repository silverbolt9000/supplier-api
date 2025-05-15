const TraceStep = require('../models/TraceStep');

exports.getTraceByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const steps = await TraceStep.find({ productId }).sort({ timestamp: 1 });
        res.json(steps);
    } catch (error) {
        console.error('Erro ao buscar rastreamento:', error);
        res.status(500).json({ error: 'Erro ao buscar rastreamento' });
    }
};

exports.createTraceStep = async (req, res) => {
    try {
        const traceStep = new TraceStep(req.body);
        await traceStep.save();
        res.status(201).json(traceStep);
    } catch (error) {
        console.error('Erro ao criar etapa de rastreamento:', error);
        res.status(400).json({ error: 'Erro ao criar etapa' });
    }
};

exports.updateTraceStep = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStep = await TraceStep.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStep) {
            return res.status(404).json({ error: 'Etapa de rastreamento não encontrada' });
        }
        res.json(updatedStep);
    }
    catch (error) {
        console.error('Erro ao atualizar etapa de rastreamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar etapa' });
    }
};


// find all trace steps listed
exports.getAllTraceSteps = async (req, res) => {
    try {
        const steps = await TraceStep.find().sort({ timestamp: 1 });
        res.json(steps);
    } catch (error) {
        console.error('Erro ao buscar todas as etapas de rastreamento:', error);
        res.status(500).json({ error: 'Erro ao buscar etapas de rastreamento' });
    }
};