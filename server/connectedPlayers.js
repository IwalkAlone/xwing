'use strict';

var _ = require('lodash');

var players = [];

var newId = (function () {
    var id = 0;
    return function () {
        id += 1;
        return id;
    };
}());

function list() {
    return _.map(players, function (player) {
        return {
            id: player.id,
            name: player.name
        };
    });
}

function add(player) {
    player.id = newId();
    players.push(player);
}

function remove(player) {
    _.remove(players, function (p) {
        return p === player;
    });
}

exports.list = list;
exports.add = add;
exports.remove = remove;