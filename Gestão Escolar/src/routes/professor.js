
const express = require('express');
const professor = require('../models/professor')
const professorSchema = require('../models/professor')
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId

    //Get

router.get('/professor', async (req, res) => {

    try {

        const professor = await professorSchema.find({});

        res.status(200).json({ professor });

    } catch (err) {

        return res.status(400).send({ err: 'Erro ao carregar as professor' });
    }
});
   

    //Get com o Codigo do Professor
router.get('/professor/:codigo', async (req, res) => {

    const { codigo } = req.params;

     //  Check if the codigo is valid!s
    
    const codigoInexistente = await professorSchema.findOne({ codigo })

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Codigo inválido, Tem que inserir um codigo existente!' })
        return
    }

    try {

        const achandoProfessor = await professorSchema.findOne({
            codigo: codigo
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

    const codigoExistente = await professorSchema.findOne({ codigo });

    if (codigoExistente) {

        res.status(409).json({ message: 'Tem que inserir um codigo Novo para um Novo Cadastro' })
        return
    }

    if (!teacherName) {

        res.status(400).json({ message: 'Requiere o TeacherName' })
        return

    }
    if (!lastName) {

        res.status(400).json({ message: 'Requiere o Sobrenome' })
        return

    }
    if (!phoneNumber) {

        res.status(400).json({ message: 'Requiere o Numero de telefono' })
        return

    }
    if (!codigo) {

        res.status(400).json({ message: 'Requiere o Codigo do professor' })
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

    const { teacherName, lastName, phoneNumber } = req.body

    const codigoInexistente = await professorSchema.findOne({ codigo });

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Tem que inserir um Codigo Valido para fazer atualização do Professor' })
        return
    }

    if (!teacherName) {

        res.status(400).json({ message: 'Requiere o teacherName' })
        return

    } if (!lastName) {

        res.status(400).json({ message: 'Requiere o Sobrenome' })
        return

    } if (!phoneNumber) {

        res.status(400).json({ message: 'Requiere o numero de telefono' })
        return

    }

    try {

        const professor = await professorSchema.findOneAndUpdate(codigo, req.body);

        res.status(200).json({ message: 'Professor atualizado com sucesso', professor });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar o Professor' });
        return

    }
});

//Delete

router.delete('/professor/:codigo', async (req, res) => {

    const {codigo} = req.params;

    const codigoInexistente = await professorSchema.findOne({ codigo });

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Tem que inserir um Codigo Valido para fazer  do Professor' })
        return
    }

    try {

        await professor.findOneAndDelete({codigo});

        res.status(200).json({ message: 'professor removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting professor' });
        return

    }

});

module.exports = router;
