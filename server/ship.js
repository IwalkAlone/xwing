'use strict';

var _ = require('lodash');

var newId = (function () {
    var id = 0;
    return function () {
        id += 1;
        return id;
    };
}());

function create(shipCard) {
    var ship = {};
    ship.atk = shipCard.atk;
    ship.hull = shipCard.hull;
    ship.dmg = shipCard.dmg;
    ship.skill = shipCard.skill;
    ship.name = shipCard.name;
    ship.player = shipCard.player;

    ship.id = newId();

    ship.takeDamage = takeDamage;

    return ship;

    function takeDamage(amount) {
        ship.hull -= amount;
        if (ship.hull <= 0) {
            ship.isDestroyed = true;
        }
    }
}

module.exports = create;