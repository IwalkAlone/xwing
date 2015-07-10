'use strict';

var _ = require('lodash');

var players = [];

function list() {
    return _.map(players, function (player) {
        return {
            id: player.id,
            name: player.name
        };
    });
}

function add(player) {
    player.id = _.uniqueId('player_');
    players.push(player);
}

function remove(player) {
    _.remove(players, function (p) {
        return p === player;
    });
}

module.exports.list = list;
module.exports.add = add;
module.exports.remove = remove;