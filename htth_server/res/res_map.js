let map = [
    {
        name : 'Làng cối xay gió',
        src : 'f',
        id : 1,
        bg : 'bg_lang',
        config : { safeZone: true, levelRequired: 1 }
    },
    {
        name : 'Biển đng 1',
        src : 'a2',
        id : 2,
        bg : 'bg_bien',
        config : { sea : 1, safeZone: false, levelRequired: 1 }
    },
    {
        name : 'Starter Island',
        src : 'starter_island',
        id : 3,
        bg : 'Starter_Island',
        config : { safeZone: true, levelRequired: 1 }
    },
    {
        name : 'Jungle Island',
        src : 'jungle_island',
        id : 4,
        bg : 'Jungle_Island',
        config : { safeZone: false, levelRequired: 5 }
    },
    {
        name : 'Desert Island',
        src : 'desert_island',
        id : 5,
        bg : 'Desert Island',
        config : { safeZone: false, levelRequired: 10 }
    },
    {
        name : 'Marine Base',
        src : 'marine_base',
        id : 6,
        bg : 'Marine_Base',
        config : { safeZone: false, levelRequired: 20 }
    },
    {
        name : 'Sky Island',
        src : 'sky_island',
        id : 7,
        bg : 'Sky_Island',
        config : { safeZone: false, levelRequired: 30 }
    }
];

module.exports = map;
