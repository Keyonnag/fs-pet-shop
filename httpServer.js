const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
    if(req.method === 'GET' && req.url === '/pets') {
        fs.readFile('./pets.json', 'utf8', function(err, petData) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                console.log(petData);
                res.end(petData);
            }
        })
    } else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile('./pets.json', 'utf8', function(err, petData) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                var pets= JSON.parse(petData)
                console.log(pets[0]);
                res.end(JSON.stringify(pets[0]));
            }
        })
    } else if (req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile('./pets.json', 'utf8', function(err, petData) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                var pets= JSON.parse(petData)
                console.log(pets[1]);
                res.end(JSON.stringify(pets[1]));
            }
        })
    } else if (req.method === 'GET') {
        fs.readFile('./pets.json', 'utf8', function(err) {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('NOT FOUND');
            }
        })
    }
});

server.listen(PORT, function() {
    console.log('listening...');
});