const express = require('express');
const app = express();

const dotEnv = require('dotenv');
dotEnv.config();

const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoute = require('./routes/bookRoute');
const signInRoute = require('./routes/signInRoute');


// MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3008;
const URL =  process.env.MONGO_URI;


mongoose.connect(URL)
.then(()=>{
  console.log("DB connected successfully!...");

  app.listen(3002, () => {
    console.log(`Server Running at http://localhost:3002`);
  })
})
.catch((err)=>{
  console.log('Error connecting to MongoDB:', err);
})


app.use('/api', bookRoute);
app.use('/api', signInRoute);

