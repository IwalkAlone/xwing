'use strict';

angular.module('main', ['btford.socket-io'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('lobby', {
                url: '/',
                templateUrl: 'templates/lobby.html'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'templates/game.html'
            });
    }])
    .run(['lobbySocket', function (lobbySocket) {}]);