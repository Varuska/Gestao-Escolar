const express = require('express');
const turmaSchema = require('../models/turma')
const alunosSchema = require('../models/alunos');
const professorSchema = require('../models/alunos');
const turma = require('../models/turma');
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId;

//Get das Turmas cadastradas
router.get('/turmas', async (req, res) => {

    try {

        const turmas = await turmaSchema.find({}).populate(['codigoProfessor']).lean();

        const turmasConNumeroDeAlunos = [];

        for (i = 0; turmas.length > i; i++) {
            const turma = turmas[i];

            const alunosDaTurma = await alunosSchema.countDocuments({ turmaNumber: turma._id });

            turma.numeroDeAlunos = alunosDaTurma;

            turmasConNumeroDeAlunos.push(turma);
        };

        res.status(200).json({ message: 'Lista das Turmas cadastradas', turmas: turmasConNumeroDeAlunos });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar as Turmas' });

    }
});

//Get com o Numero da Turma.

router.get('/turma/:turmaNumber', async (req, res) => {

    const { turmaNumber } = req.params;

    // Check if the Numero da turma is valid!

    const turma = await turmaSchema.findOne({ turmaNumber }).lean();

    if (!turma) {

        res.status(409).json({ message: 'Turma inválida, Tem que inserir um numero de turma Valido existente!' })
        return

    };

    try {

        const alunosDaTurma = await alunosSchema.countDocuments({ turmaNumber: turma._id });

        turma.numeroDeAlunos = alunosDaTurma;

        res.status(200).json({ message: 'Turma achada com sucesso', turma });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir turma', err })
        return

    }

});

//Post cadastrando Turmas
router.post('/turma', async (req, res) => {

    const { nameContent, turmaNumber, capacity, codigoProfessor } = req.body

    if (!nameContent) {

        res.status(400).json({ message: 'Requiere o nombre do Conteudo(nameContent)' })
        return

    }
    if (!turmaNumber) {

        res.status(400).json({ message: 'Requiere o numero da Turma(turmaNumber)' })
        return

    }
    if (!capacity) {

        res.status(400).json({ message: 'Requiere a capacidade de alunos (capacity)' })
        return

    }

    if (!codigoProfessor) {
        res.status(400).json({ message: 'Requiere o Codigo do Professor (CodigoProfessor)' })
        return
    }

    try {

        const turma = await turmaSchema.create(req.body);

        res.status(201).json({ message: 'Turma cadastrada com sucesso', turma })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao criar nova Turma, Verifique se os Valores dados no corpo da requisição são os corretos.' })
        return

    };


});


//Put com o Numero da Turma

router.put('/turma/:turmaNumber', async (req, res) => {

    const { turmaNumber } = req.params;

    const { capacity, codigoProfessor } = req.body
    // Check if the id is valid!
    const turmaS = await turmaSchema.findOne({ turmaNumber })

    if (!turmaS) {
        res.status(409).json({ message: 'Turma inválida, Tem que inserir um codigo existente!' })
        return
    };

    if (!capacity) {

        res.status(400).json({ message: 'Requiere atualizar a Capacidade(capacity)' })
        return

    }

    if (!codigoProfessor) {

        res.status(400).json({ message: 'Requiere o codigo do Professor(codigoProfessor)' })
        return
    }

    try {

        const turma = await turmaSchema.findOneAndUpdate({ turmaNumber: turmaNumber }, req.body);

        res.status(200).json({ message: 'Turma atualizado com sucesso' });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar Turma' });
        return

    }
});

//Delete

router.delete('/turma/:turmaNumber', async (req, res) => {

    const { turmaNumber } = req.params;

    // chech if numero de turma is valid

    const turma = await turmaSchema.findOne({ turmaNumber })

    if (!turma) {
        res.status(409).json({ message: 'Turma inválida, Tem que inserir um numero de turma existente!' })
        return
    }

    try {

        await turmaSchema.findOneAndDelete({ turmaNumber });

        res.status(200).json({ message: 'Turma removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error ao remover Turma' });
        return

    }
});


module.exports = router;
