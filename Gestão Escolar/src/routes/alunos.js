const express = require('express');
const alunos = require('../models/alunos');
const alunosSchema = require('../models/alunos');
const turmaSchema = require('../models/turma')
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId;

//Get

router.get('/alunos', async (req, res) => {

    try {

        const alunos = await alunosSchema.find({}).populate([({
            path: 'turmaNumber',
            populate: [{ 
                path: 'codigoProfessor'}]
        })])   
           

        res.status(200).json({ message: 'Lista dos Alunos cadastrados',  alunos });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar Alunos' });
    }
});

//Get com o Cpf do ALuno.

router.get('/aluno/:cpfAluno', async (req, res) => {

    const { cpfAluno } = req.params;

    // Check if the Cpf do Aluno is valid!

    const aluno = await alunosSchema.findOne({ cpfAluno })

    if (!aluno) {
        res.status(409).json({ message: 'Cpf inválido, Tem que inserir um Cpf existente!' })
        return
    }

    try {

        res.status(200).json({ messagem: 'Aluno achado com sucesso', achandoAluno: aluno });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir Alunos', err })
        return
    };

});

//Post
router.post('/alunos', async (req, res) => {

    const { nameStudent, lastName, age, cpfAluno, tutorRepresentante, turmaNumber } = req.body

    if (!nameStudent) {

        res.status(400).json({ message: 'Requiere o nombre del Aluno(nameStudent)' })
        return

    }
    if (!lastName) {

        res.status(400).json({ message: 'Requiere o Sobrenome do Aluno (lastName)' })
        return

    }
    if (!age) {

        res.status(400).json({ message: 'Requiere a idade (age) ' })
        return

    }
    if (!cpfAluno) {

        res.status(400).json({ message: 'Requiere o cpf do aluno (cpfAluno)' })
        return

    }
    if (!tutorRepresentante) {

        res.status(400).json({ message: 'Requiere o tutorRepresentante' })
        return

    }
    if (!turmaNumber) {

        res.status(400).json({ message: 'Requiere o numero da turma(turmaNumber)' })
        return

    }

    try {

        const turma = await turmaSchema.findOne({_id: turmaNumber});

        const alunosDaTurma = await alunosSchema.countDocuments({turmaNumber: turma._id});

        if(turma.capacity <= alunosDaTurma){

            res.status(400).json({ message: 'A turma esta cheia' })
            return
        };

        const alunos = await alunosSchema.create(req.body);

        res.status(201).json({ message: 'Cadastro feito com sucesso', alunos })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar novo Aluno', err })
        return
    };
});

// Put com o Cpf do Aluno.
router.put('/aluno/:cpfAluno', async (req, res) => {

    const { cpfAluno }  = req.params;

    const { nameStudent, lastName, age, tutorRepresentante, turmaNumber } = req.body

    // Check if the Cpf is valid!

    const alunoI = await alunosSchema.findOne({ cpfAluno });

    if (!alunoI) {
        res.status(409).json({ message: 'Tem que inserir um Cpf Valido para fazer atualização do Aluno' })
        return
    };

    if (!nameStudent) {

        res.status(400).json({ message: 'Requiere o nome do Aluno(nameStudent)' })
        return

    }

    if (!lastName) {

        res.status(400).json({ message: 'Requiere o sobre nome do Aluno (lastName)' })
        return

    }
    if (!age) {

        res.status(400).json({ message: 'Requiere a idade do aluno (age)' })
        return

    }
    if (!cpfAluno) {

        res.status(400).json({ message: 'Requiere o Cpf do Aluno(cpfAluno)' })
        return

    }
    if (!tutorRepresentante) {
        res.status(400).json({ message: 'Requiere o nome do representante(tutorRepresentante)' })
        return

    }
    if (!turmaNumber) {
        res.status(400).json({ message: 'Requiere o numero da turma (turmaNumber)' })
        return

    }

    try {

        const alunos = await alunosSchema.findOneAndUpdate ( {cpfAluno: cpfAluno}, req.body );

        res.status(200).json({ message: 'Aluno atualizado com sucesso', alunos });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar Aluno' });
        return

    }
});

//Delete

router.delete('/aluno/:cpfAluno', async (req, res) => {

    const { cpfAluno } = req.params;

    // chech if Cpf  is valid
    const cpfInexistente = await alunosSchema.findOne({ cpfAluno });

    if (!cpfInexistente) {
        res.status(409).json({ message: 'Tem que inserir um Cpf Valido para fazer delete do Aluno' })
        return
    };

    try {

        await alunos.findOneAndDelete({ cpfAluno });

        res.status(200).json({ message: 'Aluno removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting Aluno' });
        return
    };
});

module.exports = router;
