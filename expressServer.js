const express = require("express");
const app = express();

// app.use(express.json());

const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.get("/pets", function(req, res){
    fs.readFile('./pets.json', 'utf8', function(err, petData) {
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.json('Internal Server Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(petData);
            res.json(petData);
        }
    })
})

app.get("/pets/:id", function(req, res){
    fs.readFile('./pets.json', 'utf8', function(err, petData) {
        const pets = JSON.parse(petData)
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.json('Internal Server Error');
        } else if (pets[req.params.id] !== undefined) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(JSON.stringify(pets[req.params.id]));
            console.log(pets[req.params.id]);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('NOT FOUND');
        }
    })
})

// app.post('./pets', function(req,res) {
//     fs.writeFile('./pets.json', 'utf8', function(err, petData) {
//     const pet = req.body
//     petData.push(pet)
//     })
// })


app.listen(PORT, function() {
    console.log('listening...');
});