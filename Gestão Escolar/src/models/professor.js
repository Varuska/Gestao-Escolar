
const mongoose = require('mongoose');
const professorSchema = mongoose.Schema({

    teacherName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true 
    },
    phoneNumber: {
        type: Number,
        required:true 
    },
    codigo: {
        type: Number, 
        required:true,
        unique: true
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }


});

module.exports = mongoose.model('professor', professorSchema)
