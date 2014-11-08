var _ = require('lodash');

var games = [];

var newId = (function () {
    var id = 0;
    return function () {
        id++;
        return id;
    }
}());

function list() {
    return games;
}

function create(playerName) {
    var game = {
        id: newId(),
        p1: playerName
    };
    games.push(game);
}

function join(gameId, playerName) {
    var game = getById(gameId);
    if (!game) return;
    game.p2 = playerName;
}

function start(gameId) {
    var game = getById(gameId);
    if (!game) return false;
    cancel(gameId);
    return true;
}

function cancel (gameId) {
    _.remove(games, function (game) {
        return game.id == gameId;
    })
}

function getById (id) {
    for (var i = 0; i<games.length; i++) {
        if (games[i].id == id) {
            return games[i];
        }
    }
    return null;
}

exports.list = list;
exports.create = create;
exports.cancel = cancel;
exports.join = join;
exports.start = start;