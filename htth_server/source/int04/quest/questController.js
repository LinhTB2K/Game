let cache_player_quest = require('../../Model/playerQuest.js');
let res_quest = require('../../../res/res_quest.js');

class QuestController {
    
    // Intializes the quest map from Database into memory when Socket logs in
    static async initPlayer(socket) {
        if(!socket.uid) return false;
        let myQuest = await cache_player_quest.findOne({ uid: socket.uid }).exec();
        if(!myQuest) {
            myQuest = await cache_player_quest.create({ uid: socket.uid, progress: {} });
        }
        socket.my = socket.my || {};
        socket.my.quests = myQuest.progress || {};
        socket.my._questDocId = myQuest._id; // Reference for quick saving

        // Auto-assign first Quest to characters completely missing progressing
        if(Object.keys(socket.my.quests).length === 0) {
            QuestController.acceptQuest(socket, 1);
        }
    }

    static savePlayer(socket) {
        if(socket.my && socket.my.quests && socket.my._questDocId) {
            cache_player_quest.updateOne({ _id: socket.my._questDocId }, { progress: socket.my.quests }).exec();
        }
    }

    static sendUpdateToClient(socket) {
        let activeQuests = [];
        for(let qId in socket.my.quests) {
            let data = socket.my.quests[qId];
            if (data.status !== "CLAIMED") {
                let baseDef = res_quest.find(q => q.id == qId);
                activeQuests.push({ def: baseDef, state: data });
            }
        }
        // Emitting quest payload format to Client Tracker UI
        socket.emit('quest:update', activeQuests);
    }

    static acceptQuest(socket, questId) {
        let qDef = res_quest.find(q => q.id == questId);
        if(!qDef) return console.log("Quest không tồn tại");

        let myQuests = socket.my.quests;

        if(myQuests[questId]) return console.log("Đã nhận Quest này rồi");

        // Check level
        if(socket.my.info.chiso.level && socket.my.info.chiso.level < qDef.requiredLevel) return console.log("Chưa đủ cấp");

        // Set to IN_PROGRESS
        myQuests[questId] = {
            status: "IN_PROGRESS",
            count: {} // Tracks {"mobUid": count}
        };

        this.savePlayer(socket);
        this.sendUpdateToClient(socket);
    }

    static updateProgress(socket, type, targetId, amount) {
        if(!socket.my || !socket.my.quests) return;
        
        let changed = false;
        let myQuests = socket.my.quests;

        for(let qId in myQuests) {
            let state = myQuests[qId];
            if(state.status === "IN_PROGRESS") {
                let qDef = res_quest.find(q => q.id == qId);
                if(qDef && qDef.type === type) {
                    
                    let completedAll = true;
                    qDef.objectives.forEach(obj => {
                        if(obj.targetId == targetId) {
                            state.count[targetId] = (state.count[targetId] || 0) + amount;
                            changed = true;
                        }
                        
                        let currentAcc = state.count[obj.targetId] || 0;
                        if(currentAcc < obj.count) completedAll = false;
                    });

                    if(completedAll && changed) {
                        state.status = "COMPLETED";
                        socket.sendMap([null, "Nhiệm vụ hoàn thành!"], -29); // Simple chat bubble payload
                    }
                }
            }
        }
        
        if(changed) {
            this.sendUpdateToClient(socket);
            // Optionally, we could limit saving dynamically, but we save for now to secure DB sync
            this.savePlayer(socket);
        }
    }

    static claimReward(socket, questId) {
        let myQuests = socket.my.quests;
        if(!myQuests[questId] || myQuests[questId].status !== "COMPLETED") return;

        let qDef = res_quest.find(q => q.id == questId);
        if(qDef) {
            // Apply rewards
            if (qDef.rewards.beri > 0) {
                 process.send({ since04 : { player : { uid : socket.uid, action : 'congberi', value : qDef.rewards.beri } } });
            }
            if (qDef.rewards.exp > 0) {
                 process.send({ since04 : { player : { uid : socket.uid, action : 'congexp', value : qDef.rewards.exp } } });
            }
            if (qDef.rewards.items && qDef.rewards.items.length > 0) {
                 qDef.rewards.items.forEach(it => {
                     process.send({ since04 : { player : { uid : socket.uid, action : 'add_item', type : it.type, name : it.name, quantity: it.quantity } } });
                 });
            }

            myQuests[questId].status = "CLAIMED";
            
            // Check Chain Quest
            if(qDef.nextQuestId) {
                this.acceptQuest(socket, qDef.nextQuestId);
            } else {
                this.savePlayer(socket);
                this.sendUpdateToClient(socket);
            }
        }
    }
}

module.exports = QuestController;
