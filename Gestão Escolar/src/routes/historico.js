const express = require('express');
const historico = require('../models/historico');
const historicoSchema = require('../models/historico');
const router = express.Router();

//helpers
const objectId = require('mongoose').Types.ObjectId;

//Get

router.get('/historico', async (req, res) => {
//intentar imprimir todos los datos
//hace rel conteo
    try {

        const historico = await historicoSchema.find({}).populate([({path:'turmaNumber',populate: [{path: 'codigoProfessor'}]}),'cpfAluno'])

        res.status(200).json({ historico });

    } catch (err) {

        return res.status(400).send({ error: 'Erro ao carregar historico' });
    }
});

//Get com o codigoHistorico

router.get('/historico/:codigoHistorico', async (req, res) => {

    const { codigoHistorico } = req.params;

    // Check if the codigoHistorico valid!

    const codigoInexistente = await historicoSchema.findOne({ codigoHistorico })

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Cpf inválido, Tem que inserir um Cpf existente!' })
        return
    }

    try {

        const achandoHistorico = await historicoSchema.findOne({ codigoHistorico: codigoHistorico })

        res.status(200).json({ messagem: 'Historico achado com sucesso', achandoHistorico });

    } catch (err) {

        res.status(500).json({ message: 'Erro ao exibir historico', err })
        return
    };

});

//Post
router.post('/historico', async (req, res) => {

    const { nameStudent, cpfAluno, codigoHistorico, turmaNumber, historico } = req.body

    if (!nameStudent) {

        res.status(422).json({ message: 'Requiere o nameStudent' })
        return

    }

    if (!cpfAluno) {

        res.status(422).json({ message: 'Requiere o cpf' })
        return
    }
    
    if (!codigoHistorico) {

        res.status(422).json({ message: 'Requiere o cpf' })
        return

    }
    
    if (!turmaNumber) {

        res.status(422).json({ message: 'Requiere o turmaNumber' })
        return

    }
    if (!historico) {

        res.status(422).json({ message: 'Requiere o historico' })
        return

    }

    try {

        const historico = await historicoSchema.create(req.body);

        res.status(201).json({ message: 'Cadastro feito com sucesso', historico })

    } catch (err) {

        res.status(400).json({ message: 'Erro ao cadastrar novo Aluno', err })
        return
    };
});

//Put

router.put('/historico/:codigoHistorico', async (req, res) => {

    const { codigoHistorico }  = req.params;

    const { historico, turmaNumber } = req.body
   
    // Check if the Cpf is valid!

    const historicoInexistente = await historicoSchema.findOne({ codigoHistorico });

    if (!historicoInexistente) {
        res.status(409).json({ message: 'Tem que inserir um historico Valido para fazer atualização' })
        return
    };
   
    if (!historico) {

        res.status(422).json({ message: 'Requiere o historico' })
        return

    }
    
    if (!turmaNumber) {

        res.status(422).json({ message: 'Requiere o turmaNumber' })
        return

    }
    try {

        const historico = await historicoSchema.findOneAndUpdate(codigoHistorico, req.body);

        res.status(200).json({ message: 'Historico atualizado com sucesso', historico });

    } catch (err) {

        res.status(400).send({ err: 'Erro ao atualizar historico' });
        return

    }
});

//Delete

router.delete('/historico/:codigoHistorico', async (req, res) => {

    const {codigoHistorico} = req.params;

    // chech if Codigo Historico is valid
    const codigoInexistente = await historicoSchema.findOne({ codigoHistorico });

    if (!codigoInexistente) {
        res.status(409).json({ message: 'Tem que inserir um codigo historico Valido para fazer delete do Historico' })
        return
    };

    try {

        await historicoSchema.findOneAndDelete({codigoHistorico});

        res.status(200).json({ message: 'Historico removido com sucesso' });

    } catch (err) {

        res.status(400).send({ error: 'Error deleting Historico' });
        return
    };
});

module.exports = router;
