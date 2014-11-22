'use strict';

angular.module('main')
    .factory('lobbySocket', ['socketFactory', function (socketFactory) {
        return connect;

        function connect(name) {
            var ioSocket = io.connect('http://localhost:3000');
            var socket = socketFactory({ioSocket: ioSocket});
            socket.forward('updateGamesList');
            socket.forward('updatePlayersList');
            socket.forward('gameStart');
            socket.forward('initialState');
            socket.forward('logUpdate');
            socket.forward('decision');

            socket.on('connect', function () {
                socket.emit('joinLobby', name);
            });

            return socket;
        }
    }]);