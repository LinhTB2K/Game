
let cache_player = require('../cache/player.js');
let cache_mob = require('../cache/mob.js');
let int04 = require('../Model/init04.js')

let base_skill = require('../../res/kinang.js');
let tinhdame = require('../int04/skill/tinhdame.js');

let mapBase = require('../../res/res_map.js');
let dxdy = (x1,y1,x2,y2) => {
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}

let GroupByMapZone = () => {
    return new Promise((res,fai) => {

        cache_player.aggregate([
            {
                $group : {
                    _id : {map : "$map", zone : "$zone"},               
                }
            }
        ]).then((data) => {
            res(data);
        }
        );

    })
}

let listInMap = (map,zone) => {
    return new Promise((res,fai) => {
        cache_mob.find({map : map, zone : zone}).then((data) => {
            res(data);
        });
    });
}

let Mob = (element,io) => {
    return new Promise( async (res, fai) => {
        element.info.chiso.reset = element.info.chiso.reset || 0;
        element.info.chiso.lengtheff = element.info.chiso.lengtheff || 0;
        element.eff = element.eff || [];

        let reset = () => {
            let hp_old = element.info.chiso.hp;
            element.info.chiso = int04.chiso(element.info.chiso);
            element.info.chiso = int04.resetChiso(element.info.chiso);
            let chisogoc = element.data.chiso;
            for(let key in chisogoc) {
                element.info.chiso[key] = chisogoc[key];
            }
            element.info.chiso.hp = hp_old;

            // tính toán hiệu ứng kĩ năng bị tác dụng

            element.eff.forEach(elementEFF => {
                let  idSkill = elementEFF[0];
                let i = elementEFF[1];
                let level = elementEFF[2];
                let time = elementEFF[3];
                let infoSkill = base_skill.find(e => e.id == idSkill);
                if(infoSkill) {
                    if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                        let getdata = infoSkill.buff[i];
                        if(getdata) {
                            let tenthuoctinh = getdata[0];
                            let giatri = getdata[1];
                            let tinh = giatri + giatri * (level/100);
                            tinh = Math.round(tinh);
                            element.info.chiso[tenthuoctinh]  = element.info.chiso[tenthuoctinh]  || 0;
                            element.info.chiso[tenthuoctinh] += tinh;
                        }
                    }
                }
            });

            // tính toán % từ _

            for(let tenthuoctinh in element.info.chiso) {
                element.info.chiso[tenthuoctinh] = Math.round(element.info.chiso[tenthuoctinh]);
        
                if(tenthuoctinh.indexOf('_') == 0) {
                    // remove _ in first
                    let tenthuoctinh2 = tenthuoctinh.replace('_','');
                    // check exist
                    if(element.info.chiso[tenthuoctinh2]) {
                        let tinh = element.info.chiso[tenthuoctinh2] * (element.info.chiso[tenthuoctinh]/100);
                        tinh = Math.round(tinh);
                        element.info.chiso[tenthuoctinh2] += tinh;
                    }
                    else 
                    {
                        element.info.chiso[tenthuoctinh2] = 0;
                    }
                }
            }
            
        }

        /* Di chuyển */
        let speed = element.data.speed * 20;
        element.data.timeAttack = element.data.timeAttack || 0;
        let timeAttack = element.data.timeAttack || 0;

        if(element.info.chiso.lengtheff != element.eff.length) {
            element.info.chiso.lengtheff = element.eff.length;
            reset();
        }
        

        if(element.eff.length >=1) {
            let change = false;
            let inEFF = [];
            element.eff.forEach((elementnek,index) => {
                let time = elementnek[3];
                if(time > Date.now()) {
                    inEFF.push(elementnek);
                }
                else 
                {
                    change = true;
                }
            });
            element.eff = inEFF;

            if(change) {
                reset();
                io.sendMap([
                    element.id,
                    element.eff,
                    false,
            ],{
                pos : {
                    map : element.map,
                    zone : element.zone,
                }
            },-28)
            }

        }

        let camdi = int04.checkDi(element.eff);
        let camdanh = int04.checkDanh(element.eff);


        if(element.info.chiso.hp <=0) {
            if(element.info.timehs && element.info.timehs !=0 && element.info.timehs <= Date.now()) {
                element.info.chiso.hp = element.info.chiso.hpmax;
                element.info.timehs = 0;
                element.info.victim = 0;
                element.info.skill = [];
                element.eff = [];
                reset();

                let base_boss = element.data;
                let baseMap = mapBase.find(e => e.id == element.map);

                let name = baseMap.name;


                io.sendAll([
                    name,
                    element.zone,
                    base_boss.name,
                    ,
                ],"BOSS_SPAWN");
                // nếu là boss có thể change khu vực
                io.sendMap([
                        element.id,
                        element.info.chiso.hp,
                ],{
                    pos : {
                        map : element.map,
                        zone : element.zone,
                    }
                },-25)
            }
            else 
            {
                res({})
            }
        }

        if(element.info.chiso.hp > 0) {
            // chát
            let baseBoss = element.data;
            let data_chat = baseBoss.chat;
            if(data_chat) {
                let tile = data_chat.tile;
                element.info.chatDelay = element.info.chatDelay || 0;
                if(element.info.chatDelay <= Date.now()  && int04.rand(1,100) <= tile) {
                    let list = data_chat.list;
                    let random = int04.rand(0,list.length-1);
                    let text = list[random];
                    io.sendMap([
                        element.id,
                        text,
                    ],{
                        pos : {
                            map : element.map,
                            zone : element.zone,
                        }
                    },-29)
                    element.info.chatDelay = Date.now() + data_chat.time;
                }
            }
        }

        if(element.info.chiso.hp > 0) {
            // Ai Behaviors Setup
            let aiData = element.data.aiData || { visionRange: 200, aggroRange: 150, returnRange: 300, isAggressive: true };
            element.data.spawnX = element.data.spawnX || element.x;
            element.data.spawnY = element.data.spawnY || element.y;
            element.info.victim = element.info.victim || 0;
            
            let distToSpawn = dxdy(element.x, element.y, element.data.spawnX, element.data.spawnY);

            // 1. Check Return State
            if(distToSpawn > aiData.returnRange) {
                element.info.victim = 0; // Drop aggro
                // Move back to spawn Point
                let angle = Math.atan2(element.data.spawnY - element.y, element.data.spawnX - element.x);
                element.x += Math.cos(angle) * speed;
                element.y += Math.sin(angle) * speed;
            } 
            else {
                // 2. Locate Victim (Aggro State)
                if (element.info.victim == 0) {
                    if (aiData.isAggressive || element.info.chiso.hp < element.info.chiso.hpmax) {
                        let list = await cache_player.find({map: element.map, zone: element.zone}).exec();
                        let closestDist = aiData.aggroRange;
                        let target = null;
                        for(let p of list) {
                            p = p.my;
                            if(p.info.chiso.hp > 0) {
                                let dx = dxdy(element.x, element.y, p.pos.x, p.pos.y);
                                if(dx < closestDist) {
                                    closestDist = dx;
                                    target = p;
                                }
                            }
                        }
                        if(target) {
                            element.info.victim = target.id;
                        }
                    }
                }

                // 3. Chase and Attack
                if (element.info.victim != 0) {
                    let player = await int04.getPlayer(element.info.victim);
                    if (!player || player.pos.map != element.map || player.pos.zone != element.zone || player.info.chiso.hp <= 0) {
                        element.info.victim = 0; // Target lost or dead
                    } else {
                        let distToPlayer = dxdy(element.x, element.y, player.pos.x, player.pos.y);
                        if (distToPlayer > aiData.visionRange) {
                            element.info.victim = 0; // Target ran too far
                        } else {
                            let attackRange = 50; // default melee range
                            
                            // Chase
                            if (distToPlayer > attackRange && camdi) {
                                let angle = Math.atan2(player.pos.y - element.y, player.pos.x - element.x);
                                element.x += Math.cos(angle) * speed;
                                element.y += Math.sin(angle) * speed;
                            } 
                            // Attack
                            else if (distToPlayer <= attackRange && timeAttack < Date.now() && camdanh) {
                                element.info.skill = element.info.skill || [];
                                if(element.info.skill.length == 0) {
                                    let skill = element.data.skill;
                                    if(skill) {
                                        for(let nameskill in skill) {
                                            element.info.skill.push([nameskill, skill[nameskill], 0]);
                                        }
                                    }
                                }
                                element.data.timeAttack = Date.now() + 1500;
                                let danhsach = element.info.skill.filter(e => e[2] <= Date.now());
                                if(danhsach.length > 0) {
                                    let mySkill = danhsach[int04.rand(0, danhsach.length-1)];
                                    let idSkill = mySkill[0];
                                    let level = mySkill[1];
                                    let infoSkill = base_skill.find(e => e.id == idSkill);
                                    if(infoSkill && infoSkill.type == 'tancong') {
                                        let time = infoSkill.time - (element.info.chiso.hoichieu || 0);
                                        time = time < 200 ? 200 : time;
                                        
                                        let tinh = tinhdame(element.info.chiso, player.info.chiso, level, infoSkill);
                                        let dame = tinh.dame <= 1 ? 1 : tinh.dame;
                                        
                                        io.master.send({
                                            since04: {
                                                player: { uid: player.id, action: 'truhp', value: dame, call: true }
                                            }
                                        }, true);
                                        io.sendMap([0, player.id, dame*-1, tinh.type, 'empty'], {pos: {map: element.map, zone: element.zone}}, -17);
                                        io.sendMap([null, level, infoSkill.script, element.id, player.id], {pos: {map: element.map, zone: element.zone}}, -16);
                                        mySkill[2] = Date.now() + time;
                                    }
                                }
                            }
                        }
                    }
                } 
                // 4. Idle / Patrol 
                else {
                    if (camdi && int04.rand(1, 100) > 80 && timeAttack < Date.now()) {
                        let move = int04.rand(1,4);
                        if(move == 1) element.x -= speed;
                        if(move == 2) element.x += speed;
                        if(move == 3) element.y -= speed;
                        if(move == 4) element.y += speed;
                        element.data.timeAttack = Date.now() + 1000;
                    }
                }
            }
        }
        

        // update to db

        cache_mob.updateOne({_id : element._id},element).then((data) => {
            res({
                map : element.map,
                zone : element.zone,
                x : element.x,
                y : element.y,
                id : element.id,
            }) 
        });

        
    });
}

let cronMob = async (io) => {
    
    let time = Date.now();
    let list = await GroupByMapZone();
    let array_promise = [];
    for(let data of list) {
        let map = data._id.map;
        let zone = data._id.zone;
        array_promise.push(listInMap(map,zone));
    }

    let list_mob = await Promise.all(array_promise);

    let array_promise2 = [];

    for(let data of list_mob) {
        for(let mob of data) {
            array_promise2.push(Mob(mob,io));
        }
    }

    let result = await Promise.all(array_promise2);
    
    for(let data of list) {
        let map = data._id.map;
        let zone = data._id.zone;
        let array = [];
        result.forEach(element => {
            if(element.map == map && element.zone == zone) array.push([element.id,element.x,element.y]);
        });
        if(array.length > 0) {
            io.sendMap(array,{
                pos : {
                    map : map,
                    zone : zone,
                }
            },-5)
        }
    }

    //console.log('cronMob',Date.now() - time,'ms');

    setTimeout(() => {
        cronMob(io);
    }
    , 500);
}
 

module.exports = cronMob; 