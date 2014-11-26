'use strict';

angular.module('main')
    .factory('lobbySocket', ['socketFactory', function (socketFactory) {
        var socket;

        return {
            connect: connect,
            get: function () {
                return socket;
            }
        };

        function connect(name) {
            var ioSocket = io.connect('http://localhost:3000');
            socket = socketFactory({ioSocket: ioSocket});
            socket.forward('updateGamesList');
            socket.forward('updatePlayersList');
            socket.forward('gameStart');
            socket.forward('initialState');
            socket.forward('logUpdate');
            socket.forward('decision');

            socket.on('connect', function () {
                socket.emit('joinLobby', name);
            });
        }
    }]);