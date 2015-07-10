'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', 'game', function ($scope, lobbySocket, game) {
        lobbySocket.get().then(function (socket) {
            $scope.game = game;


        });
    }]);