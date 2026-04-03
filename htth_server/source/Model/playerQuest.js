let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let QuestSchema = new Schema({
    uid : { type : Number, required : true, index : true },
    progress: { type: Object, default: {} }, // E.g., { "1": { status: "IN_PROGRESS", count: { "3": 5 } } } key is questId
});

module.exports = mongoose.model('player_quest', QuestSchema);
