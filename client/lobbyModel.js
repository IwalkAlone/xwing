angular.module('main')
.factory('lobbyModel', ['$http', function ($http) {
        var apiUrl = 'http://localhost:3000';
        var gamesListUrl = '/games';
        var createGameUrl = '/games/create';
        var model = {
            games: [],
            createGame: createGame
        };

        function getGamesFromServer() {
            $http.get(apiUrl + gamesListUrl)
                .success(function (data) {
                    model.games = data;
                })
        }

        function createGame(hostname) {
            $http.get(apiUrl + createGameUrl + '?hostname=' + hostname)
                .success(function (data) {
                    model.games = data;
                })
        }

        getGamesFromServer();

        return model;
    }]);