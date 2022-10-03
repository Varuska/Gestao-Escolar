
const express =  require('express');
const alunos = require('../models/alunos');
const alunosSchema = require('../models/alunos');
const router = express.Router();

    //helpers
const objectId = require('mongoose').Types.ObjectId

 	 //Get

router.get('/alunos', async (req, res) => {

		 try {

        const alunos = await alunosSchema.find({}).populate('turmaNumber')

        res.status(200).json({ alunos });

    } catch (err) {

        return res.status(400).send({error: 'Erro ao carregar Alunos'});

    }
});

	//Get Id

router.get('/alunos/:Id', async (req, res) => {
    
    const id = req.params.Id

    // Check if the id is valid!

    if (!objectId.isValid(id)) {

        res.status(422).json({message: 'ID inválido!!'})
        return
    } 

    try {

        const achandoAluno = await alunos.findById(id).populate('turmaNumber');

         res.status(200).json({achandoAluno});

    } catch (err) {

			 res.status(500).json({ message:'Erro ao exibir Alunos', error })
			 return	

    }

});

		//Post
router.post('/alunos', async (req, res) => {
    
    const { nameStudent, lastName, age, cpf, tutorRepresentante, turmaNumber } = req.body

    if(!nameStudent) {

        res.status(422).json({message: 'Requiere o nameStudent'})
        return

    }
    if(!lastName) {

        res.status(422).json({message: 'Requiere o lastName'})
        return

    }
    if(!age) {

        res.status(422).json({message: 'Requiere a age'})
        return

    }
    if(!cpf) {

        res.status(422).json({message: 'Requiere o cpf'})
        return

    }
    if(!tutorRepresentante) {

        res.status(422).json({message: 'Requiere o tutorRepresentante'})
        return

    }
    if(!turmaNumber) {

        res.status(422).json({message: 'Requiere o turmaNumber'})
        return

    }

    try {

         const alunos = await alunosSchema.create(req.body);
 
         res.status(201).json({message: 'Cadastro feito com sucesso', alunos})
 
    } catch (err) {

        	res.status(400).json({ message: 'Erro ao cadastrar novo Aluno', error})
					return 
}
    
     
 });

 	//Put

router.put('/alunos/:Id', async(req, res) => {

    const id = req.params.Id

		// Check if the id is valid!
    
		if(!objectId.isValid(id)) {

      res.status(422).json({message: 'ID inválido!!'})
      return

    }

    const { nameStudent, lastName, age, cpf, tutorRepresentante, turmaNumber } = req.body

    if(!nameStudent) {

        res.status(422).json({message: 'Requiere o nameStudent'})
        return

    }

    if(!lastName) {

        res.status(422).json({message: 'Requiere o lastName'})
        return

    }

    if(!age) {

        res.status(422).json({message: 'Requiere a age'})
        return
				
    } 

    if(!cpf) {

        res.status(422).json({message: 'Requiere o cpf'})
        return

    } 

    if(!tutorRepresentante) {
        res.status(422).json({message: 'Requiere o tutorRepresentante'})
        return

    } 

    if(!turmaNumber) {
        res.status(422).json({message: 'Requiere o turmaNumber'})
        return

    } 
    
    try {

        const alunos = await alunosSchema.findByIdAndUpdate(id, req.body);

        res.status(200).json({message: 'Aluno atualizado com sucesso', alunos});

   } catch (err) {

        res.status(400).send({err: 'Erro ao atualizar Aluno'});
				return 

   }
});

	//Delete

router.delete('/alunos/:Id', async (req, res) => {

    const alunoId = req.params.Id

    // chech if id is valid

    if(!objectId.isValid(alunoId)) {

        res.status(422).json({message: 'ID inválido!!'})
        return

    }

    try {

         await alunos.findByIdAndDelete(alunoId);

         res.status(200).json({message: 'Aluno removido com sucesso'});

    } catch (err) {

      	 res.status(400).send({error: 'Error deleting Aluno' });
				 return

    }
   
});

module.exports = router;
