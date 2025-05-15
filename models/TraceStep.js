const mongoose = require('mongoose');

const traceStepSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    stage: String,
    responsible: String,
    timestamp: Date,
    location: String,
    blockchainHash: String
});

module.exports = mongoose.model('TraceStep', traceStepSchema);
