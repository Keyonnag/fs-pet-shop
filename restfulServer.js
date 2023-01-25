// Required dependencies
const express = require('express');
const client = require('./pg');
const app = express()

const port = process.env.PORT || 8000;

app.use(express.json());
app.route('/pets')
    .get( async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM pets');
            res.status(200).type('application/json').json(result.rows)
        } catch(error) {
            res.status(500).type('text/plain').send(error)
        }      
    })
    .post(async (req, res) => {
        let { body }  = req
        if (createPetValidation(body)) {
            try {
                const result = await client.query('INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3)', [body.age, body.name, body.kind])
                res.status(200).type('application/json').json(body)
            } catch(error) {
                res.status(500).type('text/plain').send(error) 
            };
        } else {
            res.status(400).type('text/plain').send("Bad Request")
        }        
    })
app.route('/pets/:id')
    .get( async (req, res) => {
        const id = req.params.id
        try {
            const result = await client.query('SELECT * FROM pets WHERE pet_id = $1', [id])
            res.status(200).type('application/json').json(result.rows)
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    }      
})   
    .patch(async (req, res) => {
        const id = req.params.id
        let { body }  = req
        if (patchPetValidation(body)) {
            try {
                const result = await client.query('UPDATE pets SET name = $1  WHERE pet_id = $2', [body.name, id])
                res.status(200).type('application/json').json(body)
            } catch(error) {
                res.status(500).type('text/plain').send(error) 
            };
        } else {
            res.status(400).type('text/plain').send("Bad Request")
        }        
    })
    .delete(async (req, res) => {
        const id = req.params.id
        try {
            const result = await client.query('DELETE FROM pets WHERE pet_id = $1', [id])
            res.status(200).type('application/json').json('PET DELETE AT $1', [id])
    } catch(error) {
        res.status(500).type('text/plain').send(error)
    };
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