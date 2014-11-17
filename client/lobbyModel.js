'use strict';

angular.module('main')
.factory('lobbyModel', ['$http', '$rootScope', '$state', 'lobbySocket', function ($http, $rootScope, $state, lobbySocket) {
        var apiUrl = 'http://localhost:3000';
        var createGameUrl = '/games/create';
        var joinGameUrl = '/games/join';
        var startGameUrl = '/games/start';

        var model = {
            games: [],
            players: [],
            connect: connect,
            createGame: createGame,
            joinGame: joinGame,
            startGame: startGame
        };

        var socket;

        function connect(name) {
            socket = lobbySocket(name);
        }

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

        $rootScope.$on('socket:updatePlayersList', function (event, list) {
            model.players = list;
        });

        $rootScope.$on('socket:gameStart', function () {
            $state.go('game');
        });

        $rootScope.$on('socket:decision', function (event, decision) {
            console.log(decision);
        });

        return model;
    }]);