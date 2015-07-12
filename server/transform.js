(function () {
    'use strict';

    function transform(position, rotation) {
        return {
            position: position,
            rotation: rotation
        };
    }

    module.exports = transform;
})();