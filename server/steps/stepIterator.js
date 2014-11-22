'use strict';

var turnStart = require('./turnStart');
var combat = require('./combat');
var sequence = [turnStart, combat];

function create() {
    var index = -1;

    function nextStep() {
        index = (index + 1) % sequence.length;
        return sequence[index];
    }

    return {
        next: nextStep
    };
}

module.exports.create = create;