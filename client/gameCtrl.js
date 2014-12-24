'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', function ($scope, lobbySocket) {
        var socket = lobbySocket.get();

        setInterval(function () {
            console.log(lobbySocket.queue);
        }, 5000);

        socket.on('initialState', function (event, state) {
            console.log(state);
        });

        socket.on('stateUpdate', function (event, data) {
            $scope.$apply(function () {
                $scope.log = data.log;
                $scope.state = data.state;
            });
        });

        socket.on('decision', function (event, decision) {
            $scope.$apply(function () {
                $scope.decision = decision;
            });
        });
        
        $scope.decisionSelectOption = function (option) {
            socket.emit('decisionResponse', option);
            $scope.resetDecision();
        };

        $scope.resetDecision = function () {
            $scope.decision = null;
        };
    }]);