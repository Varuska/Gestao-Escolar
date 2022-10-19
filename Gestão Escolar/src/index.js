const express =  require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const  alunosRoutes = require('./routes/alunos');
const  turmaRoutes = require('./routes/turma');
const professorRoutes = require('./routes/professor');
const historicoRoutes = require('./routes/historico');

    //swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');


// settings
const app = express();
const port =  process.env.PORT || 9000;

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use('/api', alunosRoutes);
app.use('/api', turmaRoutes);
app.use('/api', professorRoutes);
app.use('/api', historicoRoutes);


// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


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