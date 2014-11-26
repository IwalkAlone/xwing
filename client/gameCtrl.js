'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', function ($scope, lobbySocket) {
        var socket = lobbySocket.get();

        $scope.$on('socket:initialState', function (event, state) {
            console.log(state);
        });

        $scope.$on('socket:logUpdate', function (event, log) {
            $scope.log = log;
        });

        $scope.$on('socket:decision', function (event, decision) {
            $scope.decision = decision;
        });
        
        $scope.decisionSelectOption = function (option) {
            socket.emit('decisionResponse', option);
            $scope.resetDecision();
        };

        $scope.resetDecision = function () {
            $scope.decision = null;
        };
    }]);