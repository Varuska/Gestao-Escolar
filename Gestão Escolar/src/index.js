const express =  require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const  alunosRoutes = require('./routes/alunos');
const  turmaRoutes = require('./routes/turma');



// settings
const app = express();
const port =  process.env.PORT || 9000;

// middleware
app.use(express.json())
app.use('/api', alunosRoutes);
app.use('/api', turmaRoutes);


// routes
app.get('/', (req, res )=> {
    res.send('Welcom to my app Gestão Escolar')
});


// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDb Atlas'))
    .catch((error) => console.error(error, 'Problems connecting to the database'));


app.listen(port, () => console.log('Server listning on port', port));