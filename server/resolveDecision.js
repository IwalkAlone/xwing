'use strict';

var _ = require('lodash');
var q = require('q');

function resolveDecision(decision) {
    var resolutionDeferred = q.defer();
    decision.player.emit('decision', decision);
    decision.player.on('decisionResponse', function (response) {
        resolutionDeferred.resolve(response);
    });
    return resolutionDeferred.promise;
}

module.exports = resolveDecision;