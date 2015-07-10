(function () {
    'use strict';

    angular.module('main')
        .factory('playerData', playerData);

    function playerData() {
        var data = {
            id: undefined,
            name: undefined
        };

        return data;
    }
})();