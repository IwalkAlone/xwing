'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', 'game', function ($scope, lobbySocket, game) {
        lobbySocket.get().then(function (socket) {
            $scope.game = game;

            $scope.decisionSelectOption = function (option) {
                socket.emit('decisionResponse', option);
                resetDecision();
            };

            function resetDecision () {
                game.decision = null;
            }
        });
    }]);