const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const {jwtSecret, mongoURI} = require('./config/keys')
const dotenv = require('dotenv')
dotenv.config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended : false}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if(process.env.NODE_ENV=='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'client','build')))
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));