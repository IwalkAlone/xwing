'use strict';

var _ = require('lodash');
var q = require('q');

var resolveDecisionStub = function (decision) {
    var deferred = q.defer();
    deferred.resolve(decision.options[0]);
    return deferred.promise;
};

//var resolveDecision = resolveDecisionStub;
var resolveDecision = require('../resolveDecision');

function combat(state) {

    state.log('Turn ' + state.turn + ' Combat ');

    var combatDeferred = q.defer();

    var orderedShips = _.sortBy(state.ships, function (ship) {
        return -ship.skill;
    });
    
    var processAllShips = _.reduce(orderedShips, function (shipSequence, ship) {
        return shipSequence.then(function (state) {
            return processShip(ship, state);
        }).then(function (state) {
            return cleanUpDestroyedShips(state);
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
        player: ship.player,
        options: _.map(targets, function (target) {
            return {
                description: 'Attack' + target.name,
                shipName: target.name
            };
        })
    };

    resolveDecision(decision).then(function(resolution) {
        var target = _.find(state.ships, function (ship) {
            return ship.name === resolution.shipName;
        });
        attackTarget(ship, target, state);
        processShipDeferred.resolve(state);
    });

    return processShipDeferred.promise;
}

function attackTarget(attacker, defender, state) {
    defender.takeDamage(attacker.atk);
    state.log(attacker.name + ' deals ' + attacker.atk + ' damage to ' + defender.name);
}

function getTargetsForShip(ship, state) {
    var targets = _.filter(state.ships, function (otherShip) {
        return ship.player !== otherShip.player;
    });
    return targets;
}

function cleanUpDestroyedShips(state) {
    var destroyedShips = _.remove(state.ships, function (ship) {
        return ship.isDestroyed;
    });
    _.each(destroyedShips, function (ship) {
        state.log(ship.name + ' is destroyed');
    });
    return state;
}

module.exports = combat;