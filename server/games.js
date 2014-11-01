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
        host: playerName
    };
    games.push(game);
}

function cancel (gameId) {
    _.remove(games, function (game) {
        return game.id == gameId;
    })
}

exports.list = list;
exports.create = create;
exports.cancel = cancel;