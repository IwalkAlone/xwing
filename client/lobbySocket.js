'use strict';

var _ = require('lodash');

angular.module('main')
    .factory('lobbySocket', ['socketFactory', function (socketFactory) {
        var socket;
        var queue = [];

        return {
            connect: connect,
            queue: queue,
            get: function () {
                return socket;
            }
        };

        function connect(name) {

            var ioSocket = require('./socket');
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

            var queueEvents = [
                'updateGamesList',
                'updatePlayersList',
                'gameStart',
                'initialState',
                'stateUpdate',
                'decision'
            ];

            _.each(queueEvents, function (event, data) {
                socket.on(event, function () {
                    queue.push({
                        event: event,
                        data: data
                    });
                });
            });

            _.each(logEvents, function (event) {
                socket.on(event, function () {
                    console.log(event);
                });
            });

            socket.on('connect', function () {
                socket.emit('joinLobby', name);
            });
        }
    }]);