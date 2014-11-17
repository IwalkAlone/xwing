'use strict';

angular.module('main')
    .controller('gameController', ['$scope', 'lobbySocket', function ($scope, lobbySocket) {
        $scope.$on('socket:decision', function () {
            alert('decision');
        });
        
        $scope.buttonClick = function () {
            lobbySocket.emit('decisionResponse', {id: 1});
        };
    }]);