'use strict';

angular.module('main')
.factory('lobbySocket', ['socketFactory', function (socketFactory) {
        var ioSocket = io.connect('http://localhost:3000');
        var socket = socketFactory({ioSocket: ioSocket});
        socket.forward('updateGamesList');

        return socket;
    }]);