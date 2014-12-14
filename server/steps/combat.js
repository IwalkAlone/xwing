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
            return processShip(state, ship);
        }).then(function (state) {
            return cleanUpDestroyedShips(state);
        });
    }, q(state));
    
    processAllShips.then(function (state) {
        combatDeferred.resolve(state);
    });

    return combatDeferred.promise;
}

function processShip(state, ship) {
    var processShipDeferred = q.defer();
    
    state.log('Processing ship ' + ship.name);

    var targets = getTargetsForShip(state, ship);
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

    resolveDecision(state, decision).then(function(resolution) {
        var target = _.find(state.ships, function (ship) {
            return ship.name === resolution.shipName;
        });
        attackTarget(state, ship, target);
        processShipDeferred.resolve(state);
    });

    return processShipDeferred.promise;
}

function attackTarget(state, attacker, defender) {
    var attackTargetDeferred = q.defer();
    determineNumberOfAttackDice(state, attacker, defender).then(function (nDice) {
        var diceResults = rollAttackDice(nDice);
        state.log('Dice Results: ' + diceResults.join(', '));
        modifyAttackDice(diceResults).then(function () {
            var hits = _.filter(diceResults, function (result) {
                return result === 'hit' || result === 'crit';
            }).length;
            defender.takeDamage(hits);
            state.log(attacker.name + ' deals ' + hits + ' damage to ' + defender.name);
            attackTargetDeferred.resolve(state);
        });
        
    });
    return attackTargetDeferred.promise;
}

function determineNumberOfAttackDice(state, attacker, defender) {
    var attackDiceDeferred = q.defer();
    attackDiceDeferred.resolve(attacker.atk);
    return attackDiceDeferred.promise;
}

function rollAttackDice(nDice) {
    return _.times(nDice, rollAttackDie);
}

function rollAttackDie() {
    var sides = ['crit', 'hit', 'hit', 'hit', 'focus', 'focus', 'blank', 'blank'];
    var roll = _.random(0, 7);
    return sides[roll];
}

function modifyAttackDice(dice) {
    var modifiedDiceDeferred = q.defer();
    modifiedDiceDeferred.resolve(dice);
    return modifiedDiceDeferred.promise;
}

function getTargetsForShip(state, ship) {
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