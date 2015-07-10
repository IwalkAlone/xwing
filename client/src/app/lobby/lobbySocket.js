'use strict';

angular.module('main')
    .factory('lobbySocket', function (socketFactory, $q, playerData) {
        var socket;
        var queue = [];
        var socketDeferred = $q.defer();

        return {
            connect: connect,
            queue: queue,
            get: function () {
                return socketDeferred.promise;
            }
        };

        function connect(name) {
            var ioSocket = io.connect('http://localhost:3000');
            socket = socketFactory({ioSocket: ioSocket});
            socket.forward('updateGamesList');
            socket.forward('updatePlayersList');
            socket.forward('gameStart');
            socket.forward('initialState');
            socket.forward('stateUpdate');
            socket.forward('decision');

            var logEvents = [
                'connect',
                'reconnect',
                'disconnect',
                'connect_timeout',
                'reconnect_attempt',
                'reconnecting',
                'reconnect_error',
                'reconnect_failed',
                'connect_error'
            ];

            _.each(logEvents, function (event) {
                socket.on(event, function () {
                    console.log(event);
                });
            });

            socket.on('connect', function () {
                playerData.name = name;
                socket.emit('joinLobby', name);
            });

            socket.on('playerIdAssigned', function (id) {
                playerData.id = id;
            });

            socketDeferred.resolve(socket);
        }
    });