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
                    socket.forward('decision');

                    socket.emit('joinLobby', name);

                    return socket;
            }
    }]);