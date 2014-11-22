'use strict';

angular.module('main')
.factory('lobbyModel', ['$rootScope', '$state', 'lobbySocket', function ($rootScope, $state, lobbySocket) {

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

        function createGame() {
            socket.emit('createGame');
        }

        function joinGame(gameId) {
            socket.emit('joinGame', gameId);
        }

        function startGame(gameId) {
            socket.emit('startGame', gameId);
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