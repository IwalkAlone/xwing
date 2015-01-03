'use strict';

angular.module('main', ['btford.socket-io', 'ui.router'])
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

require('./libs/socket');
require('./lobbySocket');
require('./gameCtrl');
require('./lobbyModel');
require('./lobbyCtrl');
