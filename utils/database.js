const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('../config.json')

let db;

function connect() {
    db = new sqlite3.Database(config.sql.database_file, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the database.');
      }
    });
  }

function runSql(sqlFileName, params = []) {
    const sqlFilePath = path.join(config.sql.sql_directory, sqlFileName)
    const sql = fs.readFileSync(sqlFilePath, 'utf8')

    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(`SQL command '${sqlFileName}' executed successfully.`);
                resolve(this);
            }
        });
    });
}

module.exports = {
    connect,
    runSql
}