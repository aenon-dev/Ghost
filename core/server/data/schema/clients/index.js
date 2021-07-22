const sqlite3 = require('./sqlite3');
const mysql = require('./mysql');
const pg = require('./postgres');

module.exports = {
    sqlite3: sqlite3,
    mysql: mysql,
    pg: pg,
};
