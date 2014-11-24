'use strict';

var _ = require('lodash');
var q = require('q');

var resolveDecisionStub = function (decision) {
    var deferred = q.defer();
    deferred.resolve(decision.options[0]);
    return deferred.promise;
};

var resolveDecision = resolveDecisionStub;

function combat(state) {

    state.log('Turn ' + state.turn + ' Combat ');

    var combatDeferred = q.defer();

    var orderedShips = _.sortBy(state.ships, function (ship) {
        return -ship.skill;
    });
    
    var processAllShips = _.reduce(orderedShips, function (shipSequence, ship) {
        return shipSequence.then(function (state) {
            return processShip(ship, state);
        });
    }, q(state));
    
    processAllShips.then(function (state) {
        combatDeferred.resolve(state);
    });

    return combatDeferred.promise;
}

function processShip(ship, state) {
    var processShipDeferred = q.defer();
    
    state.log('Processing ship ' + ship.name);

    var targets = getTargetsForShip(ship, state);
    var decision = {
        type: 'chooseAttackTarget',
        options: _.map(targets, function (target) {
            return target.name;
        })
    };

    resolveDecision(decision).then(function(resolution) {
        var target = _.find(state.ships, function (ship) {
            return ship.name === resolution;
        });
        attackTarget(ship, target, state);
        processShipDeferred.resolve(state);
    });

    return processShipDeferred.promise;
}

function attackTarget(attacker, defender, state) {
    defender.hull -= attacker.atk;
    state.log(attacker.name + ' deals ' + attacker.atk + ' damage to ' + defender.name);
}

function getTargetsForShip(ship, state) {
    var targets = _.filter(state.ships, function (otherShip) {
        return ship.player !== otherShip.player;
    });
    return targets;
}

module.exports = combat;