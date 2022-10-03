
const express =  require('express');
const turma = require('../models/turma')
const turmaSchema = require('../models/turma')
const router = express.Router();

   //helpers
   const objectId = require('mongoose').Types.ObjectId

   //Get

router.get('/turma', async (req, res) => {

      try {

     const turma = await turmaSchema.find({});

     res.status(200).json({ turma });

 } catch (err) {

     return res.status(400).send({error: 'Erro ao carregar as Turmas'});

 }
});

 //Get Id

router.get('/turma/:Id', async (req, res) => {
 
 const id = req.params.Id

 // Check if the id is valid!

 if (!objectId.isValid(id)) {

     res.status(422).json({message: 'ID inválido!!'})
     return
 } 

 try {

     const achandoTurma = await turma.findById(id);

      res.status(200).json({achandoTurma});

 } catch (err) {

          res.status(500).json({ message:'Erro ao exibir turma', error })
          return	

 }

});


     //Post
router.post('/turma', async (req, res) => {
 
 const { teacherName, nameContent, totalStudent, turmaNumber } = req.body

 if(!teacherName) {

     res.status(422).json({message: 'Requiere o teacherName'})
     return

 }

 if(!nameContent) {

     res.status(422).json({message: 'Requiere o nameContent'})
     return

 }

 if(!totalStudent) {

     res.status(422).json({message: 'Requiere o totalStudent'})
     return

 }

 if(!turmaNumber) {

     res.status(422).json({message: 'Requiere o turmaNumber'})
     return

 }

 try {

      const turma = await turmaSchema.create(req.body);

      res.status(201).json({message: 'Cadastro feito com sucesso', turma})

 } catch (err) {

         res.status(400).json({ message: 'Erro ao cadastrar novo Turma', error})
                 return 

      }
 
  
});

	//Put

router.put('/turma/:Id', async(req, res) => {

 const id = req.params.Id

     // Check if the id is valid!
 
    if(!objectId.isValid(id)) {

     res.status(422).json({message: 'ID inválido!!'})
     return

 }

 const { teacherName, nameContent, totalStudent, turmaNumber } = req.body

 if(!teacherName) {

     res.status(422).json({message: 'Requiere o teacherName'})
     return

 }

 if(!nameContent) {

     res.status(422).json({message: 'Requiere o nameContent'})
     return

 } 

 if(!totalStudent) {

     res.status(422).json({message: 'Requiere o totalStudent'})
     return

 } 

 if(!turmaNumber) {

     res.status(422).json({message: 'Requiere o turmaNumber'})
     return

 } 
 
 try {

     const turma = await turmaSchema.findByIdAndUpdate(id, req.body);

     res.status(200).json({message: 'Turma atualizado com sucesso', turma});

} catch (err) {

     res.status(400).send({err: 'Erro ao atualizar Turma'});
             return 

}
});

		//Delete

router.delete('/turma/:Id', async (req, res) => {

 const TurmaId = req.params.Id

 // chech if id is valid

 if(!objectId.isValid(TurmaId)) {

    res.status(422).json({message: 'ID inválido!!'})
    return

 }

 try {

      await turma.findByIdAndDelete(TurmaId);

      res.status(200).json({message: 'Turma removido com sucesso'});

 } catch (err) {

        res.status(400).send({error: 'Error deleting Turma' });
              return

 }

});



module.exports = router;
