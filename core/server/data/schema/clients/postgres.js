const _ = require('lodash');
const db = require('../../../data/db');

const doRawAndFlatten = function doRaw(query, transaction, flattenFn) {
    return (transaction || db.knex).raw(query).then(function (response) {
        return _.flatten(flattenFn(response));
    });
};

const getTables = function getTables(transaction) {
    return doRawAndFlatten(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public';", transaction, function (response) {
        return _.map(response[0], function (entry) {
            return _.values(entry);
        });
    });
};

const getIndexes = function getIndexes(table, transaction) {
    return doRawAndFlatten(
        `SELECT indexname FROM pg_indexes WHERE tablename = '${table}';`, transaction, function (response) {
        return _.map(response[0], 'Key_name');
    });
};

const getColumns = function getColumns(table, transaction) {
    return doRawAndFlatten(
        `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = ${table};`, transaction, function (response) {
        return _.map(response[0], 'Field');
    });
};

module.exports = {
    getTables: getTables,
    getIndexes: getIndexes,
    getColumns: getColumns
};