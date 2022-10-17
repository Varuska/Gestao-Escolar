
const express = require('express');
const professorSchema = require('../models/professor')
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId

//Get Todos os Professores Cadastrados
router.get('/professores', async (req, res) => {

    try {

        const professor = await professorSchema.find({});

        res.status(200).json({ message: 'Lista dos Professores cadastrados', professor });

    } catch (err) {

        return res.status(400).send({ err: 'Erro ao carregar as professor' });
    }
});


//Get com o Codigo do Professor.
router.get('/professor/:codigo', async (req, res) => {

    const { codigo } = req.params;

    //  Check if the codigo is valid!

    const codigoI = await professorSchema.findOne({ codigo })

    if (!codigoI) {
        res.status(409).json({ message: 'Codigo inválido, Tem que inserir um codigo existente!' })
        return
    };

    try {

        const achandoProfessor = await professorSchema.findOne({
            codigo
        });

        res.status(200).json({ message: 'Professor achado com sucesso', achandoProfessor });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir professor', err })
        return
    }
});

//Post 
router.post('/professor', async (req, res) => {

    const { teacherName, lastName, phoneNumber, codigo } = req.body

    if (!teacherName) {

        res.status(400).json({ message: 'Requiere o nome do Professor(teacherName)' })
        return

    }
    if (!lastName) {

        res.status(400).json({ message: 'Requiere o Sobrenome (lastName)' })
        return

    }
    if (!phoneNumber) {

        res.status(400).json({ message: 'Requiere o Numero de telefono(phoneNumber)' })
        return

    }
    if (!codigo) {

        res.status(400).json({ message: 'Requiere o Codigo do professor(codigo)' })
        return

    }

    try {

        const professor = await professorSchema.create(req.body);

        res.status(201).json({ message: 'Cadastro feito com sucesso', professor })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar novo professor', err })
        return
    }

});

//Put com o Codigo do Professor
router.put('/professor/:codigo', async (req, res) => {

    const { codigo } = req.params;
     // Check if the id is valid!
    const { teacherName, lastName, phoneNumber } = req.body

    // chech if codigo is valid!

    const codigoI = await professorSchema.findOne({ codigo });

    if (!codigoI) {
        res.status(409).json({ message: 'Tem que inserir um Codigo Valido de 4 caracteres para fazer atualização do Professor' })
        return
    }

    if (!teacherName) {

        res.status(400).json({ message: 'Requiere o nome do  Professor(teacherName)' })
        return

    } if (!lastName) {

        res.status(400).json({ message: 'Requiere o Sobrenome(lastName)' })
        return

    } if (!phoneNumber) {

        res.status(400).json({ message: 'Requiere o numero de telefono(phoneNumber)' })
        return

    }

    try {

        const professor = await professorSchema.findOneAndUpdate({codigo: codigo }, req.body);

        res.status(200).json({ message: 'Professor atualizado com sucesso'});

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar o Professor' });
        return

    }
});

//Delete

router.delete('/professor/:codigo', async (req, res) => {

    const { codigo } = req.params;

    // chech if codigo is valid!

    const codigoI = await professorSchema.findOne({ codigo });

    if (!codigoI) {
        res.status(409).json({ message: 'Tem que inserir um Codigo Valido para fazer delete  do Professor' })
        return
    }

    try {

         await professorSchema.findOneAndDelete({ codigo });

        res.status(200).json({ message: 'professor removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting professor' });
        return

    }

});

module.exports = router;
