(function () {
    'use strict';

    angular.module('main')
        .directive('battlefield', battlefieldDirective);

    function battlefieldDirective(game) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'battlefield/battlefield.html',
            link: function (scope) {
                scope.game = game;
            }
        };
    }
})();