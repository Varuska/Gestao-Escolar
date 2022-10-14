
const mongoose = require('mongoose');
const professor = require('./professor');
const Schema = mongoose.Schema;
const turmaSchema = mongoose.Schema({

    nameContent: {
        type: String,
        required: true
    },

    turmaNumber: {
        type: Number,
        required:true,
        unique: true

    },

    capacity : {
        type: Number,
        required: true
    },
    
    codigoProfessor : [{
        type: Schema.ObjectId,
        ref: 'professor'
        
    }],

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    
});
/* professor, capacidade, alumnos

});*/
/*teacherName : {
        type: Schema.codigo,
        ref: 'professor'
    }*/

module.exports = mongoose.model('turma', turmaSchema)
