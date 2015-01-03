(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
},{"./socket":2}],2:[function(require,module,exports){
'use strict';

var socket = io.connect('http://localhost:3000');

module.exports = socket;
},{}]},{},[1]);
