'use strict';

var socket = require('../../socket');

var decisionModel = {
    active: false,
    type: '',
    options: []
};

socket.on('decision', function (data) {
    if (!data) {
        return;
    }

    decisionModel.active = true;
    decisionModel.options = data.options;
    decisionModel.type = data.type;
    console.log('Decision:');
    console.log(data);
});

var prototype = {
    get decision() {
        //console.log('decision getter called');
        //console.log(model.lastDecision);
        return decisionModel;
    },
    optionClick: function (e) {
        socket.emit('decisionResponse', e.target.templateInstance.model.option);
        decisionModel.active = false;
    }
};

module.exports = prototype;