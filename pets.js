const command = process.argv[2]
let index
let age
let kind
let name
const fs = require('fs')

function read(){
    let fileResult
    fs.readFile('./pets.json', 'utf8', function(error, data){
        if(error){
            console.log('error')
        } else {
            fileResult = JSON.parse(data)
            index = process.argv[3]
            if(index === undefined){
                console.log(fileResult)

            } else {
                if(fileResult[index] === undefined){
                    console.log('Usage: node pets.js read INDEX')
                } else {
                    console.log(fileResult[index])
                }
            }
    }
})}

function create(){
    age = process.argv[3]
    kind = process.argv[4]
    name = process.argv[5]
    let fileResult
    if(age === undefined || kind === undefined || name === undefined){
        console.log('Usage: node pets.js create AGE KIND NAME')    
    } else {
        let petObj = {
            age : parseInt(age),
            kind : kind, 
            name : name
        }
        fs.readFile('./pets.json', 'utf8', function(error, data){
            if(error){
                console.log('error')
            } else {
                fileResult = JSON.parse(data)
                fileResult.push(petObj)
                fs.writeFile('./pets.json', 
                JSON.stringify(fileResult), function(error){
                    if (error){
                        console.log(error)
                    } else console.log(petObj)
                })
            }})
    }

}


function update(){
    index = process.argv[3]
    age = process.argv[4]
    kind = process.argv[5]
    name = process.argv[6]
    let fileResult
    if(index === undefined || age === undefined || kind === undefined || name === undefined){
        console.log('Usage: node pets.js update INDEX AGE KIND NAME')    
    } else {
        fs.readFile('./pets.json', 'utf8', function(error, data){
            if(error){
                console.log('error')
            } else {
                fileResult = JSON.parse(data)
                fileResult[index] = {
                    age : parseInt(age),
                    kind : kind,
                    name : name
                }
                fs.writeFile('./pets.json', 
                JSON.stringify(fileResult), function(error){
                    if (error){
                        console.log(error)
                    } else console.log(fileResult[index])
                })
            }})
    }
}


function destroy(){
    index = process.argv[3]
    let fileResult
    if(index === undefined){
        console.log('Usage: node pets.js destroy INDEX')
    } else {
        fs.readFile('./pets.json', 'utf8', function(error, data){
            if(error){
                console.log('error')
            } else {
                fileResult = JSON.parse(data)
                fileResult.splice(index, 1)
                fs.writeFile('./pets.json', 
                JSON.stringify(fileResult), function(error){
                    if (error){
                        console.log(error)
                    } else console.log(fileResult[index])
                })
            }})
    }
}

if (command === 'create'){
    create()
} else if (command === 'read'){
    read()
} else if (command === 'update'){
    update()
} else if ( command === 'destroy'){
    destroy()
} else {
    console.log('Usage: node pets.js [read | create | update | destroy]')
}
