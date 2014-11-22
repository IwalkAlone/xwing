'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', function ($scope, lobbySocket) {
        $scope.$on('socket:decision', function () {
            alert('decision');
        });

        $scope.$on('socket:initialState', function (event, state) {
            console.log(state);
        });

        $scope.$on('socket:logUpdate', function (event, log) {
            $scope.log = log;
        });
        
        $scope.buttonClick = function () {
            lobbySocket.emit('decisionResponse', {id: 1});
        };
    }]);