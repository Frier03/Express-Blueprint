const mysql = require('mysql')
const config = require('../config.json')

const pool = mysql.createPool({})

function getConnection(){
    return pool
}

module.exports = {
    getConnection,
}