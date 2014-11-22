'use strict';

var _ = require('lodash');

var games = [];

var newId = (function () {
    var id = 0;
    return function () {
        id += 1;
        return id;
    };
}());

function list() {
    return _.map(games, function (game) {
        return {
            id: game.id,
            players: _.map(game.players, function (player) {
                return player.name;
            })
        };
    });
}

function create(player) {
    var game = {
        id: newId(),
        players: [player]
    };
    games.push(game);
}

function join(player, gameId) {
    var game = getById(gameId);
    if (!game) { return; }
    game.players.push(player);
}

function start(gameId) {
    var game = getById(gameId);
    if (!game) { return false; }
    cancel(gameId);
    return game;
}

function cancel (gameId) {
    _.remove(games, function (game) {
        return game.id === gameId;
    });
}

function getById (id) {
    var game = _.find(games, function(game) {
        return game.id === id;
    });
    return game;
}

exports.list = list;
exports.create = create;
exports.cancel = cancel;
exports.join = join;
exports.start = start;