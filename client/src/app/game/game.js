(function () {
    'use strict';

    angular.module('main')
        .factory('game', gameFactory);

    gameFactory.$inject = ['lobbySocket'];

    function gameFactory (lobbySocket) {
        var game = {
            state: null,
            log: null,
            decision: null
        };

        lobbySocket.get().then(addEventHandlers);

        function addEventHandlers(socket) {
            socket.on('initialState', function (state) {
                console.log(state);
            });

            socket.on('stateUpdate', function (data) {
                game.log = data.log;
                game.state = data.state;
            });

            socket.on('decision', function (decision) {
                game.decision = decision;
            });
        }

        return game;
    }
})();