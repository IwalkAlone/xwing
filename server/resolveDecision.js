'use strict';

var _ = require('lodash');
var q = require('q');

function resolveDecision(state, decision) {
    var resolutionDeferred = q.defer();
    decision.player.emit('decision', decision);
    state.toAllPlayers('stateUpdate', {
        state: state,
        log: state.logger.getAll()
    });
    decision.player.on('decisionResponse', function (response) {
        resolutionDeferred.resolve(response);
    });
    return resolutionDeferred.promise;
}

module.exports = resolveDecision;