let int04 = require('../../Model/init04.js');
let cache_player = require('../../cache/player.js');
let res_portal = require('../../../res/res_portal.js');
let mapAction = require('./map.js');

module.exports = function(socket,data) {
    if(!socket.uid) return false;
    if(typeof data != 'object') return console.log('Lỗi dữ liệu');
    let x = data[0];
    let y = data[1];
    let my = socket.my;
    my.pos.x = x;
    my.pos.y = y;

    // Check Portals
    let currentMap = my.pos.map;
    let portals = res_portal.filter(p => p.map == currentMap);
    let enteredPortal = null;
    for(let i = 0; i < portals.length; i++) {
        let p = portals[i];
        if(x >= p.rect[0] && x <= p.rect[2] && y >= p.rect[1] && y <= p.rect[3]) {
            enteredPortal = p;
            break;
        }
    }

    if (enteredPortal) {
        // Redirect player to the new map
        let newX = enteredPortal.toX != null ? enteredPortal.toX : 100;
        let newY = enteredPortal.toY != null ? enteredPortal.toY : y;
        mapAction(socket, [1, enteredPortal.toMap, null, newX, newY]);
        return; // Stop current move logic 
    }

    socket._sendMap([
        my.id,
        my.pos.x,
        my.pos.y,
    ],-6);
    int04.setPlayer(my);
}