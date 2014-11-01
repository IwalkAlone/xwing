angular.module('main')
.controller('lobbyController', ['$scope', 'lobbyModel', 'lobbySocket', function ($scope, lobbyModel, lobbySocket) {
        $scope.lobby = lobbyModel;
        $scope.$on('socket:clientConnected', function () {
            alert('clientConnected');
        })
    }]);