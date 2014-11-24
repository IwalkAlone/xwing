'use strict';

var _ = require('lodash');
var q = require('q');
var createLogger = require('./gameLog').create;
var createShip = require('./ship');
var createStepIterator = require('./steps/stepIterator').create;

function init(game) {
    var state = {
        turn: 0,
        players: _.map(game.players, function (player) {
            return player.name;
        })
    };

    var ships = [];
    state.ships = ships;

    var stepIterator = createStepIterator();

    ships.push(createShip({
        player: state.players[0],
        name: 'X-Wing',
        skill: 2,
        hull: 5,
        atk: 2
    }));

    ships.push(createShip({
        player: state.players[1],
        name: 'TIE Fighter #1',
        skill: 3,
        hull: 3,
        atk: 1
    }));

    ships.push(createShip({
        player: state.players[1],
        name: 'TIE Fighter #2',
        skill: 1,
        hull: 3,
        atk: 1
    }));

    ships.push(createShip({
        player: state.players[0],
        name: 'Z-95 Headhunter',
        skill: 7,
        hull: 4,
        atk: 1
    }));

    state.executeNextStep = function () {
        var step = stepIterator.next();
        var stepPromise = q(step(state));
        return stepPromise;
    };

    state.logger = createLogger();
    state.log = state.logger.log;
    state.start = start;

    function start() {
        doStep(state);
    }

    function doStep(state) {
        if (isFinished(state)) {
            return 0;
        }

        state.executeNextStep().then(function (state) {
            doStep(state);
        });
    }

    function isFinished(state) {
        var shipCountsByPlayer = _.map(state.players, function (player) {
            return _.filter(state.ships, function (ship) {
                return ship.player === player;
            }).length;
        });
        return _.any(shipCountsByPlayer, function (count) {
                return count === 0;
            });
    }

    return state;
}

module.exports.init = init;
