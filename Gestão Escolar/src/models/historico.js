
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historicoSchema = mongoose.Schema({

    nameStudent : {
        type: String,
        required: true
    },

    codigoHistorico: {
        type: Number,
        required: true,
        unique: true
    },

    historico: {
        type: String,
        required: true
    },

    idAluno: [{
        type: Schema.ObjectId,
        ref: 'alunos'
    }],

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('historico', historicoSchema);
