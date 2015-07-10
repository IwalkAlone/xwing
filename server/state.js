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
            return  {
                name: player.name,
                id: player.id,
                emit: function (event, data) {
                    return player.socket.emit(event, data);
                },
                on: function (event, callback) {
                    return player.socket.on(event, callback);
                }
            };
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
        atk: 3
    }));

    ships.push(createShip({
        player: state.players[1],
        name: 'TIE Fighter #1',
        skill: 9,
        hull: 3,
        atk: 2
    }));

    ships.push(createShip({
        player: state.players[1],
        name: 'TIE Fighter #2',
        skill: 1,
        hull: 3,
        atk: 2
    }));

    ships.push(createShip({
        player: state.players[0],
        name: 'Z-95 Headhunter',
        skill: 7,
        hull: 4,
        atk: 2
    }));

    state.executeNextStep = function () {
        var step = stepIterator.next();
        var stepPromise = q(step(state));
        return stepPromise;
    };

    state.logger = createLogger();
    state.log = state.logger.log;
    state.start = start;
    state.toAllPlayers = toAllPlayers;

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

    function toAllPlayers(event, message) {
        game.socket.emit(event, message);
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
