//
//
//

const config = require('./config.json');

const HOST = config.HOST;
const PORT = config.PORT;
const GAME_UUID = config.GAME_UUID;

const team_game = require('./team');

const GAMER_UUID = '18cfc1f6-9bb1-4747-8f67-9491612b3d14';

const socket = require('socket.io-client')(HOST + ':' + PORT);


console.log('\n GAME_UUID => ' + GAME_UUID);
console.log(' GAMER_UUID => ' + GAMER_UUID + '\n');

console.log(' connecting...');
console.log('');

socket.on('connect', function(io) {

    console.log(' <= [connect]');
    console.log(' <= [init]');

    // send identifer data to server
    socket.emit('init', {
        game_uuid: GAME_UUID,
        gamer_uuid: GAMER_UUID
    });

    socket.on('confirm', function() {
        console.log(' => [confirm]');
    });

    socket.on('start', function() {
        console.log(' *=> [starting...] wait to call you!');
    });

    socket.on('turn', function(map) {

        console.log(` => [your turn] ${new Date()}`);

        // play the game
        team_game.play(map, function(choose) {

            if (typeof choose == 'undefined') {
                return console.error(` = [err] low args , calling the callback without params`);
            }

            socket.emit('choose', choose);
        })

    });

    socket.on('end', function(info) {
        if (info.winner) {
            console.log(` *=> [end] -> winner :${info.winner}`);
            // console.log(` *=> [end] -> map :${info.map}`);
        } else {
            console.log(` *=> [end] -> tie!`);
            // console.log(` *=> [end] -> map :${info.map}`);
        }
    });

    socket.on('info', function(info) {
        console.log(` => [info] -> ${info.message}`);
    });

    socket.on('err', function(err) {
        console.log(` => [error] -> status => ${err.status} / message => ${err.message}`);
    });
});


socket.on('disconnect', function() {
    console.log(' => [disconnect] :/');
});
