let mob = [
    {
        uid : 1,
        script : {
            type : "sheet",
            img : {
                src : '1000',
                num : 7,
                w : 70,
                h : 70,
            },            
            action : {
                dungyen : [0,1],
                move  : [0,2,3],
                attack : [4,5],
                beattack : [6],
            }
        },
        exp : 300,
        name : "Sói rừng",
        speed : 3,
        chiso : {
            hpmax : 200,
            tancong : 5,
            _dam : 50,
            khang_vat_ly : 30,
            giap : 200,
            exp : 300,
            beri: [100,200],
        },

        skill : {
            'mob_1' : 1, // id skill, level
        },

    }, 

    {
        uid : 2,
        script : {
            type : "img",
            img : "CAwMyHuAOR",     
        },
        exp : 300,
        time : 2000,
        name : "Kiểm thử",
        speed : 5,
        skill : {
            'mob_1' : 1, // id skill, level
        },
        chiso : {
            hpmax : 200,
            hp : 200,
            sat_thuong_vat_ly : 1,
            sat_thuong_phep : 1,
            _chi_mang : 10,
            exp : 300,
            beri: [100,200],
        }

    },

    {
        uid : 'tfff',
        script : {
            type : "img",
            img : "cjHEzoVwKl",
        },
        exp : 300,
        time : 2000,
        name : "Avinda",
        chat : {
            time : 5000,
            tile : 100,
            list : [
                "Đứa nào dám cãi ta",
                "Xem một trùy của ta đây",
                "Nói cho ta nghe xem ai đẹp nhất biển cả này",
            ],
        },
        type : 'boss',
        speed : 5,
        skill : {
            'mob_1' : 1, // id skill, level
        },
        chiso : {
            hpmax : 20000,
            hp : 20000,
            sat_thuong_vat_ly : 1,
            sat_thuong_phep : 1,
            _chi_mang : 10,
            exp : 300,
            beri: [100,200],
        }

    },
    {
        uid : 3,
        script : { type : "img", img : "Monkey", attackImg: "Monkey_attack" },
        level : 2, exp : 50, time : 5000, name : "Monkey", type : "normal",
        aiData: { visionRange: 150, aggroRange: 100, returnRange: 300, isAggressive: false },
        speed : 3, skill : { 'mob_1' : 1 },
        chiso : { hpmax : 100, hp : 100, sat_thuong_vat_ly : 5, sat_thuong_phep : 0, giap: 10, khang_vat_ly: 0, _chi_mang : 2, exp : 50, beri: [10,20] },
        dropTable: [ { type: "normal", name: "Banana", rate: 50, quantity: 1 } ]
    },
    {
        uid : 4,
        script : { type : "img", img : "Boss_King_Monkey", attackImg: "Boss_King_Monkey_Attack" },
        level : 15, exp : 2000, time : 60000, name : "King Monkey", type : "boss",
        aiData: { visionRange: 250, aggroRange: 200, returnRange: 400, isAggressive: true },
        speed : 4, skill : { 'mob_1' : 3 },
        chiso : { hpmax : 5000, hp : 5000, sat_thuong_vat_ly : 100, sat_thuong_phep : 20, giap: 200, khang_vat_ly: 50, _chi_mang : 10, exp : 2000, beri: [500,1000] },
        dropTable: [ { type: "rare", name: "Monkey Crown", rate: 10, quantity: 1 } ]
    },
    {
        uid : 5,
        script : { type : "img", img : "Small_snake", attackImg: "Small_snake_attack" },
        level : 5, exp : 100, time : 10000, name : "Small Snake", type : "normal",
        aiData: { visionRange: 180, aggroRange: 150, returnRange: 350, isAggressive: true },
        speed : 4, skill : { 'mob_1' : 1 },
        chiso : { hpmax : 300, hp : 300, sat_thuong_vat_ly : 15, sat_thuong_phep : 0, giap: 20, khang_vat_ly: 10, _chi_mang : 5, exp : 150, beri: [20,50] },
        dropTable: [ { type: "quest", name: "Snake Fang", rate: 30, quantity: 1 } ]
    },
    {
        uid : 6,
        script : { type : "img", img : "Tran", attackImg: "Tran_attack" },
        level : 10, exp : 500, time : 20000, name : "Giant Python", type : "elite",
        aiData: { visionRange: 250, aggroRange: 200, returnRange: 500, isAggressive: true },
        speed : 5, skill : { 'mob_1' : 2 },
        chiso : { hpmax : 1500, hp : 1500, sat_thuong_vat_ly : 50, sat_thuong_phep : 0, giap: 80, khang_vat_ly: 30, _chi_mang : 10, exp : 600, beri: [100,300] },
        dropTable: [ { type: "equipment", name: "Python Scale Armor", rate: 5, quantity: 1 } ]
    },
    {
        uid : 7,
        script : { type : "img", img : "hai_tac_lost", attackImg: "hai_tac_lost_attack" },
        level : 18, exp : 1500, time : 30000, name : "Lost Pirate", type : "normal",
        aiData: { visionRange: 300, aggroRange: 250, returnRange: 600, isAggressive: true },
        speed : 3, skill : { 'mob_1' : 2 },
        chiso : { hpmax : 3500, hp : 3500, sat_thuong_vat_ly : 60, sat_thuong_phep : 0, giap: 100, khang_vat_ly: 40, _chi_mang : 12, exp : 1500, beri: [300,600] },
        dropTable: [ { type: "normal", name: "Rum", rate: 40, quantity: 1 } ]
    },
    {
        uid : 8,
        script : { type : "img", img : "Khi_Dam_Boc_tinh_anh", attackImg: "Khi_Dam_Boc_tinh_anh_Attack" },
        level : 22, exp : 4000, time : 40000, name : "Elite Boxer Monkey", type : "elite",
        aiData: { visionRange: 200, aggroRange: 200, returnRange: 450, isAggressive: true },
        speed : 6, skill : { 'mob_1' : 3 },
        chiso : { hpmax : 8000, hp : 8000, sat_thuong_vat_ly : 120, sat_thuong_phep : 0, giap: 150, khang_vat_ly: 60, _chi_mang : 15, exp : 4000, beri: [500,1000] },
        dropTable: [ { type: "equipment", name: "Boxing Gloves", rate: 10, quantity: 1 } ]
    },
    {
        uid : 9,
        script : { type : "img", img : "Pig", attackImg: "Pig_attack" },
        level : 4, exp : 80, time : 8000, name : "Wild Boar", type : "normal",
        aiData: { visionRange: 150, aggroRange: 100, returnRange: 300, isAggressive: false },
        speed : 5, skill : { 'mob_1' : 1 },
        chiso : { hpmax : 200, hp : 200, sat_thuong_vat_ly : 10, sat_thuong_phep : 0, giap: 15, khang_vat_ly: 5, _chi_mang : 3, exp : 80, beri: [15,30] },
        dropTable: [ { type: "normal", name: "Boar Meat", rate: 60, quantity: 1 } ]
    },
    {
        uid : 10,
        script : { type : "img", img : "bird", attackImg: "bird_attack" },
        level : 12, exp : 800, time : 12000, name : "Seagull", type : "normal",
        aiData: { visionRange: 400, aggroRange: 150, returnRange: 800, isAggressive: false },
        speed : 7, skill : { 'mob_1' : 1 },
        chiso : { hpmax : 800, hp : 800, sat_thuong_vat_ly : 30, sat_thuong_phep : 5, giap: 30, khang_vat_ly: 10, _chi_mang : 20, exp : 800, beri: [100,200] },
        dropTable: [ { type: "quest", name: "White Feather", rate: 25, quantity: 1 } ]
    },
    {
        uid : 11,
        script : { type : "img", img : "Grab", attackImg: "Grab_attack" },
        level : 25, exp : 8000, time : 60000, name : "Grab Delivery", type : "boss",
        aiData: { visionRange: 400, aggroRange: 400, returnRange: 1000, isAggressive: true },
        speed : 8, skill : { 'mob_1' : 4 },
        chiso : { hpmax : 25000, hp : 25000, sat_thuong_vat_ly : 250, sat_thuong_phep : 0, giap: 300, khang_vat_ly: 100, _chi_mang : 25, exp : 8000, beri: [2000,5000] },
        dropTable: [ { type: "rare", name: "Fast Helmet", rate: 5, quantity: 1 } ]
    }
];

module.exports = mob;