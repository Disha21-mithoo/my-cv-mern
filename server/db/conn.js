//connecting to mongo start
const mongoose = require("mongoose");

const server = '0.0.0.0:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'mernstack';      // REPLACE WITH YOUR DB NAME
const DB = process.env.URL;
class Database {
 constructor() {
   this._connect()
 }
_connect() {
    mongoose.connect(DB+`${database}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
 }
}

module.exports = new Database()
//connecting to  mongo end
