const express = require('express');
const turma = require('../models/turma')
const turmaSchema = require('../models/turma')
const router = express.Router();

//Helpers

const objectId = require('mongoose').Types.ObjectId;

//Get

router.get('/turma', async (req, res) => {

    try {

        const turma = await turmaSchema.find({}).populate(['codigoProfessor'])

        res.status(200).json({ turma });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar as Turmas' });

    }
});

//Get Id

router.get('/turma/:turmaNumber', async (req, res) => {

    const { turmaNumber } = req.params;

    // Check if the turmaNumber is valid!

    const turmaInexistente = await turmaSchema.findOne({ turmaNumber })

    if (!turmaInexistente) {

        res.status(409).json({ message: 'Turma inválida, Tem que inserir um numero de turma Valido existente!' })
        return

    }


    try {

        const achandoTurma = await turma.findOne({ turmaNumber });

        res.status(200).json({message: 'Turma achada com sucesso', achandoTurma });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir turma', err })
        return

    }

});


//Post
router.post('/turma', async (req, res) => {

    /*temos que trabalhar por cada alumno que é cadastrado y fazer uma contagem
    cont = n+ 1
    o resultado tem que se exibihir em get, tiens que hacer una capacidad maxima para alumnos*/
    const { nameContent, turmaNumber,  capacity, totalStudent, codigoProfessor } = req.body

    if (!nameContent) {

        res.status(422).json({ message: 'Requiere o nameContent' })
        return

    }

    if (!turmaNumber) {

        res.status(422).json({ message: 'Requiere o turmaNumber' })
        return

    }

    if (!capacity) {

        res.status(422).json({ message: 'Requiere a capacidade' })
        return

    }

    if (!totalStudent) {

        res.status(422).json({ message: 'Requiere o numero total' })
        return

    }

    if (!codigoProfessor) {

        res.status(422).json({ message: 'Requiere o codigo do Professor' })
        return

    }

    try {

        const turma = await turmaSchema.create( req.body );

        res.status(201).json({ message: 'Cadastro feito com sucesso', turma })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar novo Turma', err })
        return

    }


});

//Put

router.put('/turma/:turmaNumber', async (req, res) => {
    //tem que fazer uma cont= +1 e -1 para saber as quantidade de alumnos presentes
    const { turmaNumber } = req.params;
    // Check if the id is valid!
    const turmaInexistente = await turmaSchema.findOne({ turmaNumber })

    if (!turmaInexistente) {
        res.status(409).json({ message: 'Turma inválida, Tem que inserir um codigo existente!' })
        return
    }

    const { codigoProfessor, capacity, totalStudent } = req.body

    if (!capacity) {

        res.status(422).json({ message: 'Requiere atualizar a Capacidade' })
        return

    }

    if (!totalStudent) {

        res.status(422).json({ message: 'Requiere atualizar a totalStudent' })
        return

    }

    if (!codigoProfessor) {

        res.status(422).json({ message: 'Requiere o codigo do Professor' })
        return
    }

    try {

        const turma = await turmaSchema.findOneAndUpdate({turmaNumber});

        res.status(200).json({ message: 'Turma atualizado com sucesso', turma });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar Turma' });
        return

    }
});

//Delete

router.delete('/turma/:turmaNumber', async (req, res) => {

    const { turmaNumber } = req.params;

    // chech if id is valid

    const turmaInexistente = await turmaSchema.findOne({ turmaNumber })

    if (!turmaInexistente) {
        res.status(409).json({ message: 'Turma inválida, Tem que inserir um codigo existente!' })
        return
    }

    try {

        await turmaSchema.findOneAndDelete(turmaNumber);

        res.status(200).json({ message: 'Turma removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting Turma' });
        return

    }
});



module.exports = router;
