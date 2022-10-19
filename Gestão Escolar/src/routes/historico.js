const express = require('express');
const historico = require('../models/historico');
const historicoSchema = require('../models/historico');
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId;

//Get

router.get('/historicos', async (req, res) => {

    try {

        const historico = await historicoSchema.find({})
            .populate([({
                path: 'idAluno',
                populate: [{
                    path: 'turmaNumber',
                    populate: [{ path: 'codigoProfessor' }]
                }]
            })
            ]);

        res.status(200).json({ message: 'Lista das Turmas cadastradas', historico });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar historico' });
    }
});

//Get com o codigo Historico.

router.get('/historico/:codigoHistorico', async (req, res) => {

    const { codigoHistorico } = req.params;

    // Check if the codigo Historico is valid!

    const historicoI = await historicoSchema.findOne({ codigoHistorico })

    if (!historicoI) {
        res.status(409).json({ message: 'codigo Historicoinválido, Tem que inserir um codigo existente!' })
        return
    }

    try {

        const achandoHistorico = await historicoSchema.findOne({ codigoHistorico })

        res.status(200).json({ messagem: 'Historico achado com sucesso', achandoHistorico });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir historico', err })
        return
    };

});

//Post
router.post('/historico', async (req, res) => {

    const { nameStudent, codigoHistorico, historico,
        turmaAtualizada, idAluno} = req.body

    if (!nameStudent) {

        res.status(400).json({ message: 'Requiere o nombre do Aluno (nameStudent)' })
        return

    }  if (!codigoHistorico) {

        res.status(400).json({ message: 'Requiere o codigo do historico(codigoHistorico)' })
        return

    }
    if (!historico) {

        res.status(400).json({ message: 'Requiere o historico(historico)' })
        return
    } if (!turmaAtualizada) {

        res.status(400).json({ message: 'Requiere a turma Atualizada(turmaAtualizada)' })
        return
    }
    if (!idAluno) {

        res.status(400).json({ message: 'Requiere o Id do aluno(idAluno)' })
        return
    }

    try {

        const historico = await historicoSchema.create(req.body);

        res.status(201).json({ message: 'Cadastro feito com sucesso', historico })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar o historico Novo', err })
        return
    };
});

//Put com o Codigo do Historico

router.put('/historico/:codigoHistorico', async (req, res) => {

    const { codigoHistorico } = req.params;

    const { historico } = req.body

    // Check if the Cpf is valid!

    const historicoI = await historicoSchema.findOne({ codigoHistorico });

    if (!historicoI) {
        res.status(409).json({ message: 'Tem que inserir um historico Valido para fazer atualização' })
        return
    };

    if (!historico) {

        res.status(400).json({ message: 'Requiere o historico(historico)' })
        return

    }

    try {

        const historico = await historicoSchema.findOneAndUpdate({codigoHistorico: codigoHistorico}, req.body);

        res.status(200).json({ message: 'Historico atualizado com sucesso', historico });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar historico' });
        return

    }
});

//Delete

router.delete('/historico/:codigoHistorico', async (req, res) => {

    const { codigoHistorico } = req.params;

    // chech if Codigo Historico is valid
    const codigoI = await historicoSchema.findOne({ codigoHistorico });

    if (!codigoI) {
        res.status(409).json({ message: 'Tem que inserir um codigo historico Valido para fazer delete do Historico' })
        return
    };

    try {

        await historicoSchema.findOneAndDelete({ codigoHistorico });

        res.status(200).json({ message: 'Historico removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting Historico' });
        return
    };
});

module.exports = router;
