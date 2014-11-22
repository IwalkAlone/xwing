'use strict';

var _ = require('lodash');

function create() {
    var entries = [];

    function log(message) {
        var entry = {
            timestamp: Date.now(),
            message: message
        };
        entries.push(entry);
    }

    function getSince(timestamp) {
        return _.where(entries, function (entry) {
            return entry.timestamp >= timestamp;
        });
    }

    function getAll() {
        return entries;
    }

    return {
        log: log,
        getSince: getSince,
        getAll: getAll
    };
}

module.exports.create = create;

