(function () {
    'use strict';

    angular.module('main')
        .directive('playerArea', playerAreaDirective);

    function playerAreaDirective(game, playerData) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'playerArea/playerArea.html',
            link: link
        };

        function link (scope, element, attrs) {
            var isPlayer = attrs.player === 'player';

            scope.$watch(function () {
                return game.state;
            }, function (newGameState) {
                scope.ships = getShipsForPlayer(newGameState);
            });

            scope.ships = getShipsForPlayer();

            function getShipsForPlayer(gameState) {
                if (!gameState) {
                    return [];
                }
                return _.filter(gameState.ships, function (ship) {
                    return (ship.player.id === playerData.id) === isPlayer;
                });
            }
        }
    }
})();