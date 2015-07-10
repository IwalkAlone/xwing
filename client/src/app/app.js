'use strict';

angular.module('main')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('lobby', {
                url: '/',
                templateUrl: 'lobby/lobby.html'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'game/game.html'
            });
    }])
    .run(['lobbySocket', 'game', function (lobbySocket, game) {}]);