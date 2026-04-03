let quests = [
    {
        id: 1,
        name: "Welcome to Starter Island",
        description: "Talk to Marine Garp to learn about the island.",
        type: "talk", // kill, collect, talk, explore
        rarity: "Common",
        objectives: [
            { targetId: "ac", count: 1 } // Garp's NPC id is 'ac'
        ],
        rewards: {
            beri: 100,
            exp: 50,
            items: []
        },
        requiredLevel: 1,
        nextQuestId: 2,
        faction: "all" // marine, pirate, all
    },
    {
        id: 2,
        name: "Clearing the Forest",
        description: "Defeat 5 Monkeys to secure the path.",
        type: "kill",
        rarity: "Common",
        objectives: [
            { targetId: 3, count: 5 } // Monkey mob uid is 3
        ],
        rewards: {
            beri: 500,
            exp: 200,
            items: []
        },
        requiredLevel: 1,
        nextQuestId: 3,
        faction: "all"
    },
    {
        id: 3,
        name: "Boar Hunt",
        description: "Collect 3 Boar Meats around the island by defeating wild boars.",
        type: "collect",
        rarity: "Common",
        objectives: [
            { targetId: "Boar Meat", count: 3 } // Drop name
        ],
        rewards: {
            beri: 1000,
            exp: 500,
            items: [{ type: "equipment", name: "Beginner Sword", quantity: 1 }]
        },
        requiredLevel: 2,
        nextQuestId: null,
        faction: "all"
    },
    {
        id: 4,
        name: "Wanted: Sand Worm",
        description: "Bounty Hunt: Slay the Sand Worm located in the Desert Island.",
        type: "kill",
        rarity: "Rare",
        objectives: [
            { targetId: 5, count: 1 } // Sand Worm mob uid is 5
        ],
        rewards: {
            beri: 5000,
            exp: 3000,
            items: []
        },
        requiredLevel: 10,
        nextQuestId: null,
        faction: "marine"
    }
];

module.exports = quests;
