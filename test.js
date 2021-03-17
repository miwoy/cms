let YAML = require('yamljs')
let fs = require('fs')

let compose = fs.readFileSync("./docker-compose.yml").toString()
// console.log(JSON.stringify(compose))
let dirname = "asd"
let space = 2
let serviceNames = []
compose = compose.split("\n").map(row=> {
    if (row && row.trim()[0] != "#" && row.slice(0, space) != "  ") isService = false
    if (row.trimEnd()=="services:") isService = true
    if (isService && new RegExp(`^\\s{${space}}\\w+:$`).test(row.trimEnd())) {
        row = row.replace(/(\w+:)/,dirname + "-$1")
        serviceNames.push(row.trim().slice(0,-1))
    }
    return row
}).join("\n")

console.log(serviceNames)