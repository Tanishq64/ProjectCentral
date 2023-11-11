const express = require('express')

const app = express()
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function create_account(req, res){
    body = req.body
    console.log(body)
}

app.post("/account/create", create_account)
app.listen(8080)