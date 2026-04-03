let int04 = require('../../Model/init04');
let res_mob = require('../../../res/res_mob.js');

module.exports = (info_object, socket) => {
    if(socket.uid <= 0) return false;
    let my = socket.my;

    info_object.info.timehs = info_object.info.timehs || 0;

    let base_info = res_mob.find(e => e.uid == info_object.uid);
    if(base_info) {
        if(base_info.time) {
            info_object.info.timehs = base_info.time + Date.now();
        }

        // DROP SYSTEM LOGIC
        let beriRange = base_info.chiso.beri || [0, 0];
        let beriDrop = int04.rand(beriRange[0], beriRange[1]);
        if (beriDrop > 0) {
            process.send({
                since04 : {
                    player : {
                        uid : socket.uid,
                        action : 'congberi',
                        value : beriDrop
                    }
                }
            });
        }

        let dropTable = base_info.dropTable;
        if(dropTable) {
            dropTable.forEach(drop => {
                let chance = int04.rand(1, 100);
                if(chance <= drop.rate) {
                    process.send({
                        since04 : {
                            player : {
                                uid : socket.uid,
                                action : 'add_item',
                                type : drop.type, // 'normal', 'rare', 'equipment', 'quest'
                                name : drop.name,
                                quantity : drop.quantity || 1
                            }
                        }
                    });
                    // Log to console for debugging purposes as UI might missing
                    console.log(`Player ${socket.uid} received dropdown item: ${drop.name} (${drop.type})`);
                }
            });
        }
        
        // Quest Kill Trigger
        let questController = require('../quest/questController.js');
        questController.updateProgress(socket, 'kill', base_info.uid, 1);
    }
    
    return info_object;
}