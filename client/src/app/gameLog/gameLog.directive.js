(function () {
    'use strict';

    angular.module('main')
        .directive('gameLog', gameLogDirective);

    function gameLogDirective(game) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'gameLog/gameLog.html',
            link: function (scope, element) {
                scope.game = game;
                scope.$watch(function () {
                    return game.log;
                }, scrollToBottom);

                function scrollToBottom() {
                    var elem = element.children()[0];
                    elem.scrollTop = elem.scrollHeight;
                }
            }
        };
    }
})();