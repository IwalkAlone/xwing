'use strict';

var _ = require('lodash');

function create(shipCard) {
    var ship = {};
    ship.atk = shipCard.atk || 0;
    ship.agi = shipCard.agi || 0;
    ship.hull = shipCard.hull || 0;
    ship.shield = shipCard.shield || 0;
    ship.skill = shipCard.skill;
    ship.name = shipCard.name;
    ship.player = shipCard.player;

    ship.id = _.uniqueId('ship_');

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