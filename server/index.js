var express = require('express');
var games = require('./games');
var _ = require('lodash');
var app = express();

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/games', function (req, res) {
    var gamesList = games.list();
    res.send(gamesList);
});

app.get('/games/create', function (req, res) {
    var hostname = req.query.hostname;
    if (_.isUndefined(hostname)) {
        res.sendStatus(400);
        return;
    };
    games.create(hostname);
    var gamesList = games.list();
    res.status(201).send(gamesList);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});