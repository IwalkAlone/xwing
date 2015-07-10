(function () {
    'use strict';

    angular.module('main')
        .directive('decision', decisionDirective);

    function decisionDirective(game, lobbySocket) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'decision/decision.html',
            link: function (scope) {
                scope.game = game;

                lobbySocket.get().then(function (socket) {
                    scope.decisionSelectOption = function (option) {
                        socket.emit('decisionResponse', option);
                        resetDecision();
                    };

                    function resetDecision () {
                        game.decision = null;
                    }
                });
            }
        };
    }
})();