const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

//mongodb connection;
const uri = process.env.ATLAS_URI;
mongoose
  .connect(
    uri,{useNewUrlParser:true}
  )
  .then(() => console.log("Connected to db.."))
  .catch((err) => console.log(err));


// import routes 
const userRoute = require('./routes/users');
const exerciseRoute = require('./routes/exercises');
app.use('/users', userRoute);
app.use('/exercises', exerciseRoute);


// server listens
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})