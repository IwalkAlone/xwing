'use strict';

angular.module('main')
.controller('lobbyController', ['$scope', 'lobbyModel', function ($scope, lobbyModel) {
        $scope.lobby = lobbyModel;
    }]);