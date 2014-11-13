'use strict';

angular.module('main')
.factory('lobbyModel', ['$http', '$rootScope', '$state', function ($http, $rootScope, $state) {
        var apiUrl = 'http://localhost:3000';
        var createGameUrl = '/games/create';
        var joinGameUrl = '/games/join';
        var startGameUrl = '/games/start';

        var model = {
            games: [],
            createGame: createGame,
            joinGame: joinGame,
            startGame: startGame
        };

        function createGame(hostname) {
            $http.get(apiUrl + createGameUrl + '?hostname=' + hostname);
        }

        function joinGame(name, gameId) {
            $http.get(apiUrl + joinGameUrl + '?playername=' + name + '&gameid=' + gameId);
        }

        function startGame(gameId) {
            $http.get(apiUrl + startGameUrl + '?gameid=' + gameId);
        }

        $rootScope.$on('socket:updateGamesList', function (event, list) {
            model.games = list;
        });

        $rootScope.$on('socket:gameStart', function () {
            $state.go('game');
        });

        return model;
    }]);