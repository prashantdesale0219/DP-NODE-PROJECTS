const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/userRoutes');
const connectionToDB = require('./Config/db');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;
app.use(cors());


// Middleware
app.use(bodyParser.json());
app.use('/api/users', router);



app.listen(PORT || 3000,async()=>{
    try {
     await connectionToDB
     console.log(`Server running on http://localhost:${PORT}`)
    } catch (error) {
     console.log(error)
    }
 })
