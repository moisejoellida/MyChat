let connection = require('../config/db');
const { static } = require('express');

class Message {

    static create(content, cb){
        connection.query('INSERT INTO message SET content = ?, create_at = ?',[content, new Date()], (err, result) => {
            if(err) throw err;
            cb(result)
        })
    }
    static call(cb){
        connection.query('SELECT * FROM message', (err, row) => {
            if(err) throw err
            cb(row)
        })
    }
}

module.exports = Message