
const mongoose = require('mongoose');
const turmaSchema = mongoose.Schema({

    teacherName : {
        type: String,
        required: true
    },

    nameContent: {
        type: String,
        required: true
    },
  
    totalStudent: {
        type: Number,
        required: true
    },

    turmaNumber: {
        type: Number,
        required:true 
    }

});

module.exports = mongoose.model('turma', turmaSchema)
