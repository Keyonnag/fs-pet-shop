// Require dependencies
const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express()
// Global variables
const port = process.env.PORT || 8000;
const petsPath = path.join(__dirname, 'pets.json')
// Middleware for body parsing using raw-JSON, alternative express.urlencoded({ extended: true }) to use x-www-form-urlencoded
app.use(express.json());
app.route('/pets')
    .get((req, res) => {
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
                res.status(500).type('text/plain').send('Internal Server Error')
            }            
            res.status(200).type('application/json').send(petsJSON)
        });
    })
    .post((req, res) => {
        let bodyObj = req.body
        if (createPetValidation(bodyObj)) {
            fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
                if (err) {
                    res.status(500).type('text/plain').send('Internal Server Error')
                }
    
                const petsObj = JSON.parse(petsJSON)               
                petsObj.push(bodyObj)
                fs.writeFile(petsPath, JSON.stringify(petsObj), function(err){
                    if (err) {
                        res.status(500).type('text/plain').send('Internal Server Error')
                    }
                    res.status(200).type('application/json').json(bodyObj)            
                })                
            });
        } else {
            res.status(400).type('text/plain').send("Bad Request")
        }        
    })
app.route('/pets/:id')   
    .get((req, res) => {
        const id = req.params.id
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
                res.status(500).type('text/plain').send('Internal Server Error')
            }
            const petsObj = JSON.parse(petsJSON)
            if (id < 0 || id > (petsObj.length -1) || isNaN(id) || petsObj[id] === null) {
                res.status(404).type('text/plain').send('Not found')
            } else {
                res.status(200).type('application/json').json(petsObj[id])
            }
        });
    })
    .patch((req, res) => {
        const id = req.params.id
        let bodyObj = req.body
        if (patchPetValidation(bodyObj)) {
            fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
                if (err) {
                    res.status(500).type('text/plain').send('Internal Server Error')
                }
    
                const petsObj = JSON.parse(petsJSON)
                const petObj = petsObj[id]    
                for (key in bodyObj) {
                    petObj[key] = bodyObj[key]
                }
                fs.writeFile(petsPath, JSON.stringify(petsObj), function(err){
                    if (err) {
                        res.status(500).type('text/plain').send('Internal Server Error')
                    }
                    res.status(200).type('application/json').json(bodyObj)            
                })                
            });
        } else {
            res.status(400).type('text/plain').send("Bad Request")
        }        
    })
    .delete((req, res) => {
        const id = req.params.id
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
                res.status(500).type('text/plain').send('Internal Server Error')
            }
            const petsObj = JSON.parse(petsJSON)
            const deletedObj = petsObj[id]
            petsObj[id] = null
            fs.writeFile(petsPath, JSON.stringify(petsObj), function(err){
                if (err) {
                    res.status(500).type('text/plain').send('Internal Server Error')
                }
                res.status(200).type('application/json').json(deletedObj)            
            })                
        });
    })
// Responds with error if no routes are hit
app.use((req, res) => {
    res.status(404).type('text/plain').send('Not found')
})
// Server Listening
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
// Create Pet Object Validation 
function createPetValidation(obj) {
    let age = false;
    let kind = false;
    let name = false;
    for (key in obj) {
        if (key === 'age' && (typeof obj[key]) === 'number' && obj[key] !== null) {
            age = true;
        } else if (key === 'kind' && obj[key] !== '') {
            kind = true;
        } else if (key === 'name' && obj[key] !== '') {
            name = true;
        }
    }
    if (age && kind && name) {
        return true
    } else return false
}
// Patch Pet Object Validation 
function patchPetValidation(obj) {
    let age = false;
    let kind = false;
    let name = false;
    for (key in obj) {
        if (key === 'age' && obj[key] != '' && !isNaN(obj[key])) {
            age = true;
        } else if (key === 'kind' && obj[key] != '') {
            kind = true;
        } else if (key === 'name' && obj[key] != '') {
            name = true;
        }
    }
    if (age || kind || name) {
        return true
    } else return false
}