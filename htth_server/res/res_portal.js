let portals = [
    { map: 1, rect: [2400, 0, 2500, 1000], toMap: 2, toX: 219, toY: 482 }, // Right edge goes to map 5 Left edge
    // Map 2
    { map: 2, rect: [-50, 0, 10, 1000], toMap: 1, toX: 219, toY: 482 }, // Left edge goes to map 4 Right edge
    { map: 2, rect: [2400, 0, 2500, 1000], toMap: 3, toX: 219, toY: 482 }, // Right edge goes to map 5 Left edge
    // Map 3 (Starter Island) links
    { map: 3, rect: [-50, 0, 10, 1000], toMap: 2, toX: 219, toY: 482 }, // Left edge goes to map 4 Right edge
    { map: 3, rect: [2400, 0, 2500, 1000], toMap: 4, toX: 219, toY: 482 }, // Right edge goes to map 5 Left edge
    
    // Map 4 (Jungle Island) links
    { map: 4, rect: [-50, 0, 10, 1000], toMap: 3, toX: 219, toY: 482 }, // Right edge goes to map 3 Left edge
    { map: 4, rect: [2400, 0, 2500, 1000], toMap: 5, toX: 219, toY: 482 }, // Right edge goes to map 6 Left edge

    // Map 5 (Desert Island) links
    { map: 5, rect: [-50, 0, 10, 1000], toMap: 3, toX: 219, toY: 482 }, // Left edge goes to map 3 Right edge
    { map: 5, rect: [2400, 0, 2500, 1000], toMap: 6, toX: 219, toY: 482 }, // Right edge goes to map 6 Left edge

    // Map 6 (Marine Base) links
    { map: 6, rect: [-50, 0, 10, 1000], toMap: 5, toX: 219, toY: 482 }, // Left edge goes to map 5 Right edge
    { map: 6, rect: [2400, 0, 2500, 1000], toMap: 7, toX: 219, toY: 482 }, // Right edge goes to map 7 Left edge

    // Map 7 (Sky Island) links
    { map: 7, rect: [-50, 0, 10, 1000], toMap: 6, toX: 219, toY: 482 }, // Left edge goes to map 6 Right edge
];

module.exports = portals;
