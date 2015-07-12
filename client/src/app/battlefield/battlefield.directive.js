(function () {
    'use strict';

    angular.module('main')
        .directive('battlefield', battlefieldDirective);

    function battlefieldDirective(game) {
        return {
            restrict: 'E',
            scope: {},
            link: link
        };

        function link(scope, element, attrs) {
            var size = 900;
            var renderer = PIXI.autoDetectRenderer(size, size, {
                backgroundColor: 0x888888
            });

            var stage = new PIXI.Container();

            element[0].appendChild(renderer.view);

            scope.$watch(function () {
                return game.state;
            }, function (newGameState) {
                if (!newGameState) {
                    return;
                }
                stage.removeChildren();
                _.each(game.state.ships, function (ship) {
                    addShipToStage(stage, ship);
                });
            });

            animate();

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(stage);
            }

            function addShipToStage(stage, ship) {
                var sprite = PIXI.Sprite.fromImage('images/sprites/x_wing.png');
                var shipLocalCoords = toLocalCoords(ship.transform.position);
                sprite.x = shipLocalCoords.x;
                sprite.y = shipLocalCoords.y;
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.rotation = rotationVectorToRadians(ship.transform.rotation);
                stage.addChild(sprite);
            }

            function toLocalCoords(vector) {
                var scalingFactor = size / 1000;
                var localX = vector.x * scalingFactor;
                var localY = vector.y * scalingFactor;
                return {
                    x: localX,
                    y: localY
                };
            }

            function rotationVectorToRadians(vector) {
                if (vector.x === 0 && vector.y === 1) {
                    return 0;
                } else {
                    return Math.PI;
                }
            }
        }
    }
})();