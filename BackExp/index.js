const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const expenseroute = require('./route/expenseroute');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const mongoose_url = process.env.MONGGOSE_URL;

mongoose.connect(mongoose_url)
.then(()=>{
    console.log("successfully connected with mongoose atlas...");
})
.catch((err)=>{
    console.log("error",err);
})

app.use('/api/expense',expenseroute);

app.listen(4000,()=>{
    console.log("server runs succesfully..")
})

// mongodb+srv://harmanduggal509:<db_password>@cluster0.twlho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0