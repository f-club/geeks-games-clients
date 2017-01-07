//
// simple sample code
//
// in this file you can write your logic of your playing
// other files are driver to connect to server.
//
// if you see any BUG in this client of the game please open
// an issue on github in this link :
// https://github.com/geeks-fight-club/geeks-games-clients/issues
//
// and if you see any BUG in SERVER side open an issue here :
// https://github.com/geeks-fight-club/geeks-games-core/issues
//

function play(map, cb) {

    cb = cb || function() {};

    // here is you playing codes
    // for example, this is a simple random choose in `xo` game

    console.log(map);

    let choose = Math.floor(Math.random() * 9);

    while (map[choose] != 0) {
        // create a random choose
        choose = Math.floor(Math.random() * 9);

        // console.log(map[choose]);
    }

    console.log(`choose -> ${choose}`);


    // NOTE you have limited time to play
    // cb is a function you should call when
    // you choose your play in this turn.

    return cb(choose);
}

module.exports = play;