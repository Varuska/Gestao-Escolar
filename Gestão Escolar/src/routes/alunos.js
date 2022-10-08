const express = require('express');
const alunos = require('../models/alunos');
const alunosSchema = require('../models/alunos');
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId;

//Get

router.get('/alunos', async (req, res) => {

    try {

        const alunos = await alunosSchema.find({}).populate('turmaNumber')

        res.status(200).json({ alunos });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar Alunos' });
    }
});

//Get com o cpfAluno

router.get('/alunos/:cpfAluno', async (req, res) => {

    const { cpfAluno } = req.params;

    // Check if the cpfAluno valid!

    const codigoInexistente = await alunosSchema.findOne({ cpfAluno })

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Cpf inválido, Tem que inserir um Cpf existente!' })
        return
    }

    try {

        const achandoAluno = await alunosSchema.findOne({ cpfAluno: cpfAluno }).populate('turmaNumber')
        ;

        res.status(200).json({ messagem: 'Aluno achado com sucesso', achandoAluno });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir Alunos', err })
        return
    };

});

//Post
router.post('/alunos', async (req, res) => {

    const { nameStudent, lastName, age, cpfAluno, tutorRepresentante, turmaNumber } = req.body

    if (!nameStudent) {

        res.status(422).json({ message: 'Requiere o nameStudent' })
        return

    }
    if (!lastName) {

        res.status(422).json({ message: 'Requiere o lastName' })
        return

    }
    if (!age) {

        res.status(422).json({ message: 'Requiere a age' })
        return

    }
    if (!cpfAluno) {

        res.status(422).json({ message: 'Requiere o cpf' })
        return

    }
    if (!tutorRepresentante) {

        res.status(422).json({ message: 'Requiere o tutorRepresentante' })
        return

    }
    if (!turmaNumber) {

        res.status(422).json({ message: 'Requiere o turmaNumber' })
        return

    }

    try {

        const alunos = await alunosSchema.create(req.body);

        res.status(201).json({ message: 'Cadastro feito com sucesso', alunos })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar novo Aluno', err })
        return
    };
});

//Put

router.put('/alunos/:cpfAluno', async (req, res) => {

    const { cpfAluno }  = req.params;

    const { nameStudent, lastName, age, tutorRepresentante, turmaNumber } = req.body

    // Check if the Cpf is valid!

    const cpfInexistente = await alunosSchema.findOne({ cpfAluno });

    if (!cpfInexistente) {
        res.status(409).json({ message: 'Tem que inserir um Cpf Valido para fazer atualização do Aluno' })
        return
    };

    if (!nameStudent) {

        res.status(422).json({ message: 'Requiere o nameStudent' })
        return

    }

    if (!lastName) {

        res.status(422).json({ message: 'Requiere o lastName' })
        return

    }

    if (!age) {

        res.status(422).json({ message: 'Requiere a age' })
        return

    }

    if (!cpfAluno) {

        res.status(422).json({ message: 'Requiere o Cpf do Aluno' })
        return

    }

    if (!tutorRepresentante) {
        res.status(422).json({ message: 'Requiere o tutorRepresentante' })
        return

    }

    if (!turmaNumber) {
        res.status(422).json({ message: 'Requiere o turmaNumber' })
        return

    }

    try {

        const alunos = await alunosSchema.findOneAndUpdate(cpfAluno, req.body);

        res.status(200).json({ message: 'Aluno atualizado com sucesso', alunos });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar Aluno' });
        return

    }
});

//Delete

router.delete('/alunos/:cpfAluno', async (req, res) => {

    const { cpfAluno } = req.params;

    // chech if Cpf  is valid
    const cpfInexistente = await alunosSchema.findOne({ cpfAluno });

    if (!cpfInexistente) {
        res.status(409).json({ message: 'Tem que inserir um Cpf Valido para fazer delete do Aluno' })
        return
    };

    try {

        await alunos.findOneAndDelete(cpfAluno);

        res.status(200).json({ message: 'Aluno removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting Aluno' });
        return
    };
});

module.exports = router;
