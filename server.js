const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./Routes/api/items')

const app = express();


// Body parser middleware
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose 
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('mongodb connected ...'))
.catch(err => console.log(err));


app.use('/api/items', items)

// serve static assets if in production
if(process.env.NODE_ENV === 'production' ){

    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`))