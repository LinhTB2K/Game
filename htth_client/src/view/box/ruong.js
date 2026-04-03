import baseShowInfoItem from "./baseItem.js";



export default class ruongView extends baseShowInfoItem {
    constructor( ) {
        super();
        this.tab.my = [
            [9200,"hanhTrang","Hành trang"],
            [9201,"TrangBi","Trang bị"],
            [9202,"thongTin","Thông tin"],
            [9203,"classkinang","Kĩ năng"],
            [9204,"quester","Nhiệm vụ"],
            [9205,"bando","Bản đồ"]
        ];
    }
    classkinang = (name = 'classkinang') => {
        let my = this.my;
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);
        let render = new PIXI.Container();

        let y = 0;

        let list_skill = this.skill;
        // sort object.type follow tancong => chudong => bidong
        list_skill.sort((a,b) => {
            if(a.type == b.type) {
                return 0;
            }
            if(a.type == 'tancong') {
                return -1;
            }
            if(b.type == 'tancong') {
                return 1;
            }
            if(a.type == 'hotro') {
                return -1;
            }
            if(b.type == 'hotro') {
                return 1;
            }
            if(a.type == 'bidong') {
                return -1;
            }
            if(b.type == 'bidong') {
                return 1;
            }
            return 0;
        });
        let i = 0;
        list_skill.forEach(element => {
            let myskill = my.skill.find(e => e[0] && e[0] == element.id);
            if(myskill) {
                let background = new PIXI.Graphics();
                background.keycode = 'int04';
                let width = nen.width * 0.95;
                let height = nen.height * 0.3;
                height = height > 60 ? 60 : height;
                background.beginFill(0x000000,0.0000000001);
                background.drawRect(0,0,width,height);
                background.endFill();
                background.x = nen.width / 2 - background.width / 2;
                background.y = y;
                render.addChild(background);
                y += height +  5 * i;
                i++;

                background.interactive = true;
                background.cursor = 'help';
                let time = 0;
                background.on('pointerdown',() => {
                    time = Date.now();
                });
                background.on('pointerup',() => {
                    if(Date.now() - time < 300) {
                        this.showInfoSkill(background,myskill,'btn_skill_gan');
                    }
                });


                let containerKinang = new PIXI.Container();
                background.addChild(containerKinang);

                let icon_w = background.width * 0.3;
                let icon_h = background.height * 0.9;
                icon_w = icon_w > 45 ? 45 : icon_w;

                let icon = new PIXI.Sprite(this.coverImg(element.avatar));
                icon.width = icon_w;
                icon.height = icon_w;
                icon.x = 0;
                icon.y = 0;
                containerKinang.addChild(icon);

                let background_info = new PIXI.Graphics();
                background_info.beginFill(0x000000,0.0000000001);
                background_info.drawRect(0,0,background.width - icon.width,icon.height);
                background_info.endFill();
                background_info.x = icon.width;
                background_info.y = 0;
                containerKinang.addChild(background_info);

                let container_info = new PIXI.Container();
                background_info.addChild(container_info);

                let name = new PIXI.Text(element.name,{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0xffffff,
                    align : 'center'
                });
                name.x = 5;
                name.y = 0;
                container_info.addChild(name);

                let background_button_info_desc = new PIXI.Graphics();
                background_button_info_desc.beginFill(0xFFFFFF,0.000000001);
                background_button_info_desc.drawRect(0,0,background_info.width,background_info.height - name.height);
                background_button_info_desc.endFill();
                background_button_info_desc.x = 0;
                background_button_info_desc.y = name.height;
                container_info.addChild(background_button_info_desc);

                let desc_level_width = background_button_info_desc.width * 0.3;
                desc_level_width = desc_level_width > 100 ? 100 : desc_level_width;

                let background_button_info_desc_level = new PIXI.Graphics();
                background_button_info_desc_level.beginFill(0x000000,0.000000001);
                background_button_info_desc_level.drawRect(0,0,desc_level_width,background_button_info_desc.height);
                background_button_info_desc_level.endFill();
                background_button_info_desc_level.x = 0;
                background_button_info_desc_level.y = 0;
                background_button_info_desc.addChild(background_button_info_desc_level);

                let level = new PIXI.Text('Cấp ' + myskill[1],{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0x00FF00,
                    align : 'center'
                });
                level.x = 5;
                level.y = background_button_info_desc_level.height / 2 - level.height / 2;
                background_button_info_desc_level.addChild(level);

                let background_button_info_desc_info = new PIXI.Graphics();
                background_button_info_desc_info.beginFill(0x000000,0.00000001);
                background_button_info_desc_info.drawRect(0,0,background_button_info_desc.width - background_button_info_desc_level.width,background_button_info_desc.height);
                background_button_info_desc_info.endFill();
                background_button_info_desc_info.x = background_button_info_desc_level.width;
                background_button_info_desc_info.y = 0;
                background_button_info_desc.addChild(background_button_info_desc_info);

                let my_exp = myskill[3];
                let exp_need = this.expskill[myskill[1]];
                exp_need = !exp_need ? 9999 : exp_need;
                let tile = my_exp / exp_need * 100;
                tile = tile > 100 ? 100 : tile;

                // created process bar
                let background_button_info_desc_info_process = new PIXI.Graphics();
                background_button_info_desc_info_process.beginFill(0x000000,1);
                background_button_info_desc_info_process.drawRect(0,0,background_button_info_desc_info.width,background_button_info_desc_info.height);
                background_button_info_desc_info_process.endFill();
                background_button_info_desc_info_process.x = 0;
                background_button_info_desc_info_process.y = 0;
                background_button_info_desc_info.addChild(background_button_info_desc_info_process);

                let background_button_info_desc_info_process_1 = new PIXI.Graphics();
                background_button_info_desc_info_process_1.beginFill(0x00FF00,1);
                background_button_info_desc_info_process_1.drawRect(0,0,background_button_info_desc_info_process.width * tile / 100,background_button_info_desc_info_process.height);
                background_button_info_desc_info_process_1.endFill();
                background_button_info_desc_info_process_1.x = 0;
                background_button_info_desc_info_process_1.y = 0;
                background_button_info_desc_info_process.addChild(background_button_info_desc_info_process_1);


                // created show text
                let float = Math.fround(tile).toFixed(2);
                let text = new PIXI.Text(''+float+'%',{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0xffffff,
                    align : 'center'
                });
                text.x = background_button_info_desc_info_process.width / 2 - text.width / 2;
                text.y = background_button_info_desc_info_process.height / 2 - text.height / 2;
                background_button_info_desc_info_process.addChild(text);







                container_info.y = background_info.height / 2 - container_info.height / 2;

                containerKinang.x = 0;
                containerKinang.y = (background.height - containerKinang.height) / 2;

            }
        });





        this.viewPointDefaultY(nen,render);

        
    }

    thongTin = (name = 'thongTin') => {
        let my = this.my;
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);
        let render = new PIXI.Container();

        let y = 0;

        let chiso = [
            'haki',
            '_haki',
            'hpmax',
            'mpmax',
            'sat_thuong_vat_ly',
            'sat_thuong_phep',
            'khang_vat_ly',
            'khang_phep',
            '_hpmax',
            '_mpmax',
            '_chi_mang',
            '_sat_thuong_chi_mang',
            '_giam_sat_thuong_chi_mang',
            '_hoi_mau',
            '_hoi_mp',
            '_sat_thuong_vat_ly',
            '_sat_thuong_phep',
            '_khang_vat_ly',
            '_khang_phep',
            'hoi_chieu'
        ];
        for(let tenthuoctinh of chiso) {
            let tinh = my.info.chiso[tenthuoctinh] || 0;
            let getThuocTinh = this.getThuocTinh(tenthuoctinh);
            let text = ''+getThuocTinh.name+' '+tinh+''+getThuocTinh.value+'  ';
            if(tenthuoctinh.indexOf('_') == 0) {
                text = (tinh >= 0 ? this._("Tăng") : this._('Giảm')) + " "  +text;
            }
            let txt1 = new PIXI.Text(text,{fontFamily : 'Arial', fontSize: 15, fill : 0xffffff, align : 'left', fontWeight: 'bold', WordWrap: true, WordWrapWidth: nen.width - 10});
            txt1.x =0;
            txt1.y = y;
            y+= txt1.height + 5;
            render.addChild(txt1);
        }
        render.x = 15;


        this.viewPointDefault(nen,render);

        
    }

    TrangBi = (name = 'TrangBi') => {
        let my = this.my;

        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x000000,0.0000000001);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        let tab_width_left = nen.width * 0.3;
        let tab_height_left = nen.height;
        tab_width_left = tab_width_left > 48 ? 48 : tab_width_left;

        let background_left = new PIXI.Graphics();
        background_left.beginFill(0xFFFFFF,0.0000000000000005);
        background_left.drawRect(0,0,tab_width_left,tab_height_left);
        background_left.endFill();
        nen.addChild(background_left);

        let list_box_left = [
            'vukhi', 'nhan', 'daychuyen', 'caitrang'
        ];
        let container_left = new PIXI.Container();
        background_left.addChild(container_left);
        let space_Y = 5;
        list_box_left.forEach((element,i) => {
            let width = tab_width_left;
            let height = (tab_height_left - space_Y*  (list_box_left.length) ) / (list_box_left.length);
            height = height > 48 ? 48 : height;
            let box = new PIXI.Graphics();
            box.beginFill(0xae9069,1.0000000001);
            box.lineStyle(2,0x6a4b2a,1);
            box.drawRect(0,0,width,height);
            box.endFill();
            box.x = 0;
            box.y = i * height + i * space_Y;
            container_left.addChild(box);

            if(my.trangbi[element] && my.trangbi[element] !=0) {
                box.interactive = true;
                box.cursor = 'help';
                let time = 0;
                let data = my.ruong.data.find(e => e.id == my.trangbi[element] && e.active == 'trangbi');
                if(data) {
                    box.on('pointerdown', () => {
                        time = Date.now()
                    });
                    box.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            this.previewItemBag(box,data);
                        }
                    });

                    box = this.showItem(box,data);
                }

            }

        });
        container_left.y = (tab_height_left - container_left.height) / 2;


        let backgorund_right = new PIXI.Graphics();
        backgorund_right.beginFill(0xFFFFFF,0.000000000005);
        backgorund_right.drawRect(0,0,tab_width_left,tab_height_left);
        backgorund_right.endFill();
        backgorund_right.x =  nen.width - backgorund_right.width;
        nen.addChild(backgorund_right);

        let list_box_right = [
            'non', 'ao', 'quan', 'thucuoi'
        ];
        let container_right = new PIXI.Container();
        backgorund_right.addChild(container_right);

        list_box_right.forEach((element,i) => {
            let width = tab_width_left;
            let height = (tab_height_left - space_Y*  (list_box_left.length) ) / (list_box_left.length);
            height = height > 48 ? 48 : height;
            let box = new PIXI.Graphics();
            box.beginFill(0xae9069,1.0000000001);
            box.lineStyle(2,0x6a4b2a,1);
            box.drawRect(0,0,width,height);
            box.endFill();
            box.x = 0;
            box.y = i * height + i * space_Y;
            container_right.addChild(box);

            if(my.trangbi[element] && my.trangbi[element] !=0) {
                box.interactive = true;
                box.cursor = 'help';
                let time = 0;
                let data = my.ruong.data.find(e => e.id == my.trangbi[element] && e.active == 'trangbi');
                if(data) {
                    box.on('pointerdown', () => {
                        time = Date.now()
                    });
                    box.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            this.previewItemBag(box,data);
                        }
                    });

                    box = this.showItem(box,data);
                }

            }

        });

        container_right.y = (tab_height_left - container_right.height) / 2;



        let background_center_width = nen.width - tab_width_left * 2;
        let background_center_height = nen.height * 0.8;
        let background_center = new PIXI.Graphics();
        background_center.beginFill(0xFFFFFF,0.0000000001);
        background_center.drawRect(0,0,background_center_width,background_center_height);
        background_center.endFill();
        background_center.x = tab_width_left;
        background_center.y = (nen.height - background_center.height) / 2;
        nen.addChild(background_center);

        let bw = background_center.width * 0.9;
        let bh = background_center.height * 1;
        let center = new PIXI.Graphics();
        center.beginFill(0xae9069,1.5);
        center.lineStyle(1,0x6a4b2a,1);

        center.drawRect(0,0,bw,bh);
        center.endFill();
        center.x = (background_center.width - center.width) / 2;
        center.y = (background_center.height - center.height) / 2;
        background_center.addChild(center);


        let let_info_width = center.width * 0.6;
        let let_info_height = center.height * 1;
        let let_info = new PIXI.Graphics();
        let_info.beginFill(0xae9069,0.00000001);

        let_info.drawRect(0,0,let_info_width,let_info_height);
        let_info.endFill();
        let_info.x = 0;
        let_info.y = (center.height - let_info.height) / 2;
        center.addChild(let_info);

        let right_info_width = center.width - let_info.width;
        let right_info_height = center.height * 0.5;
        let right_info = new PIXI.Graphics();
        right_info.beginFill(0xae9069,0.0000000000000005);

        right_info.drawRect(0,0,right_info_width,right_info_height);
        right_info.endFill();
        right_info.x = let_info.width;
        right_info.y =  (center.height - right_info.height) / 2;
        center.addChild(right_info);

        let sprite_show = this.created_sprite_skin_hi(my,'dungyen');
        sprite_show.x = (right_info.width - sprite_show.width) / 2;
        sprite_show.y = (right_info.height - sprite_show.height) / 2;
        right_info.addChild(sprite_show);
        sprite_show.alpha = 0;
        // shake sprite

        let b = TweenMax.to(sprite_show,0.1,{x: sprite_show.x - 3,repeat:-1,yoyo:true});

        TweenMax.to(sprite_show,1,{alpha:1}
        ).eventCallback('onComplete',() => {
            b.kill();
        });




        
    }

    hanhTrang = (name = 'hanhTrang') => {

        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');


        let hienthinoidung = new PIXI.Container();
        hienthinoidung.name = "container";

        // mask
        let mask = new PIXI.Graphics();
        mask.beginFill(0x000000,0.5);
        mask.drawRect(0,0,body.width,body.height);
        mask.endFill();
        hienthinoidung.mask = mask;
        body.addChild(mask);

        let my = this.my;
        let data = my.ruong.data.filter(e => e.active == 'hanhtrang');
        // sort data by data.time ASC
        data.sort((a,b) => {
            return a.time - b.time;
        });
        if(body) {
            let num_o = this.my.ruong.max;
            let o_w = body.width * 0.2;
            o_w = o_w > 48 ? 48 : o_w;
            let o_h = o_w;

            let space_x = 2;
            let space_y = 2;

            let num_x = Math.floor(body.width / (o_w + space_x));
            for(let i = 0; i < num_o; i++) {
                let o = new PIXI.Graphics();
                o.beginFill(0xae9069,0.5);
                o.drawRect(0,0,o_w,o_h);
                o.endFill();
                o.x = (i % num_x) * (o_w + space_x);
                o.y = Math.floor(i / num_x) * (o_h + space_y);
                o.interactive = true;
                o.keycode = 'int04';
                o.cursor = 'pointer';
                let time = 0;
                

                if(data[i]) {
                    o.on('pointerdown', () => {
                        time = Date.now()
                    });
                    o.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            this.previewItemBag(o,data[i],'btn_hanhtrang');
                        }
                        
                    });
                    o = this.showItem(o,data[i]);

                }
                


                


                hienthinoidung.addChild(o);
            }

            if(hienthinoidung.height < body.height) {
                let height = body.height;
                let width = body.width;
                let background = new PIXI.Graphics();
                background.beginFill(0x000000,0.000000005);
                background.drawRect(0,0,width,height);
                background.endFill();
                hienthinoidung.addChild(background);
            }

            let viewport = new pixi_viewport.Viewport({
                screenWidth: body.width,
                screenHeight: body.height,
                worldWidth: hienthinoidung.width,
                worldHeight: hienthinoidung.height ,
            });
            viewport.name = "viewport";

            viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        viewport.setZoom(1); 
        viewport.addChild(hienthinoidung);
        body.addChild(viewport);


        

        let pointerStartTime = 0;
        let point = -1;
        let point_X = -1;
        let point_Y = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
        });

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(1, 0xFFFFFF, 1);
                        background.beginFill(0xf8fe4a, 0.000001);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = this.findInteractiveObjects(current);
                        if(event.length > 0) {
                            event[0].emit('pointerdown');
                            event[0].emit('pointerup');
                        }
                        point_X = i % num_x;
                        point_Y = Math.floor(i / num_x);
                        point = i;
                    }
                }

            } else {
                clearInterval(this.pcSettimeEntactive);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactive);
                    eventGame();
                }, 200);
            }
        });

        

        let eventGame = () => {
            if(this.pcSettimeEntactive) clearInterval(this.pcSettimeEntactive);
            this.pcSettimeEntactive = setInterval(() => {
                let event = this.pcKey;
                if(this.box.children.length <= 0) {
                    clearInterval(this.pcSettimeEntactive);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                
                if(event == 'ArrowUp') {
                    if(point_Y == -1) {
                        point_Y = 0;
                    } else {
                        point_Y--;
                    }
                } else if(event == 'ArrowDown') {
                    if(point_Y == -1) {
                        point_Y = 0;
                    } else {
                        point_Y++;
                    }
                } else if(event == 'ArrowLeft') {
                    if(point_X == -1) {
                        point_X = 0;
                    } else {
                        point_X--;
                    }
                } else if(event == 'ArrowRight') {
                    if(point_X == -1) {
                        point_X = 0;
                    } else {
                        point_X++;
                    }
                }
                if(point_X >= 0 && point_Y >= 0) {
                    point = point_Y * num_x + point_X;
                } else if(point_X >= 0 && point_Y == -1) {
                    point = point_X;
                } else if(point_X == -1 && point_Y >= 0) {
                    point = point_Y;
                } else {
                    point = -1;
                }

                
                if(event == 'Enter' && point >= 0) {
                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);
                    if(eventdata.length > 0) {
                        eventdata[0].emit('pointerdown');
                        eventdata[0].emit('pointerup');
                    }
                }

                
                if(children[point] && this.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenter(children[point].x, children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(1, 0xFFFFFF, 1);
                    background.beginFill(0xf8fe4a, 0.000000001);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);


                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }

                }
                this.pcKey = '';
            }, 30);
        };

        eventGame();

        }
    }

    quester = (name = 'quester') => {
        let my = this.my;
        this.box.name_menu = name; // identifier for namespace to refresh
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);
        let body = this.box.getChildByName('body');

        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);

        let left_width = nen.width * 0.4;
        let right_width = nen.width * 0.6;
        let left_height = nen.height;

        let left_panel = new PIXI.Graphics();
        left_panel.beginFill(0xae9069, 1);
        left_panel.lineStyle(1,0x6a4b2a,1);
        left_panel.drawRect(0,0,left_width,left_height);
        left_panel.endFill();
        nen.addChild(left_panel);

        let right_panel = new PIXI.Graphics();
        right_panel.beginFill(0x856c4e, 1);
        right_panel.lineStyle(1,0x6a4b2a,1);
        right_panel.drawRect(0,0,right_width,left_height);
        right_panel.endFill();
        right_panel.x = left_width;
        nen.addChild(right_panel);

        let quests = this.my.questPayload || [];

        // RENDER LEFT PANEL (List)
        let renderLeft = new PIXI.Container();
        let l_y = 5;
        quests.forEach((qData, i) => {
            let def = qData.def;
            let st = qData.state;
            let qbox = new PIXI.Graphics();
            qbox.beginFill(0x6a4b2a, 1);
            qbox.lineStyle(1, 0xFFFFFF, 0.5);
            qbox.drawRect(0,0,left_width - 10, 45);
            qbox.endFill();
            qbox.x = 5;
            qbox.y = l_y;
            qbox.interactive = true;
            qbox.cursor = 'pointer';
            
            let txtName = new PIXI.Text(def.name, {fontFamily:'Arial',fontSize:13,fill:0xFFFFFF,fontWeight:'bold',wordWrap:true, wordWrapWidth:left_width - 15});
            txtName.x = 5; txtName.y = 5;
            let txtStatus = new PIXI.Text(st.status === "COMPLETED" ? "Hoàn thành" : "Đang làm", {fontFamily:'Arial',fontSize:12,fill: st.status === "COMPLETED" ? 0x00FF00 : 0xFFFFAA});
            txtStatus.x = 5; txtStatus.y = 28;
            qbox.addChild(txtName, txtStatus);
            renderLeft.addChild(qbox);
            l_y += 50;

            qbox.on('pointerdown', () => { 
                this.cache.activeQuestSelected = qData; 
                this.quester(); // Re-render the view
            });
        });
        
        let dummyLeftViewport = new PIXI.Container();
        dummyLeftViewport.addChild(renderLeft); // Using primitive attach for the scope 
        left_panel.addChild(dummyLeftViewport);

        // RENDER RIGHT PANEL (Detail)
        let renderRight = new PIXI.Container();
        let activeQ = this.cache.activeQuestSelected;
        if(activeQ) {
            let def = activeQ.def;
            let st = activeQ.state;

            let r_y = 10;
            let title = new PIXI.Text(def.name, {fontFamily:'Arial', fontSize:17, fill:0xFFD700, fontWeight:'bold', wordWrap:true, wordWrapWidth:right_width-20});
            title.x = 10; title.y = r_y; r_y += title.height + 10;
            
            let desc = new PIXI.Text(def.description, {fontFamily:'Arial', fontSize:14, fill:0xFFFFFF, wordWrap:true, wordWrapWidth:right_width-20});
            desc.x = 10; desc.y = r_y; r_y += desc.height + 15;

            let objTitle = new PIXI.Text("Mục tiêu:", {fontFamily:'Arial', fontSize:15, fill:0x00FF00, fontWeight:'bold'});
            objTitle.x = 10; objTitle.y = r_y; r_y += objTitle.height + 5;
            def.objectives.forEach(obj => {
                let currentAt = st.count[obj.targetId] || 0;
                let objTxt = new PIXI.Text("- Yêu cầu: " + currentAt + "/" + obj.count, {fontFamily:'Arial', fontSize:13, fill:0xFFFFFF});
                objTxt.x = 20; objTxt.y = r_y; r_y += objTxt.height + 5;
                renderRight.addChild(objTxt);
            });
            r_y += 10;

            let rewTitle = new PIXI.Text("Phần thưởng:", {fontFamily:'Arial', fontSize:15, fill:0x00FFFF, fontWeight:'bold'});
            rewTitle.x = 10; rewTitle.y = r_y; r_y += rewTitle.height + 5;
            if(def.rewards.beri > 0) {
               let r1 = new PIXI.Text("+ " + def.rewards.beri + " Beri", {fontFamily:'Arial', fontSize:13, fill:0xFFFFFF});
               r1.x = 20; r1.y = r_y; r_y += r1.height + 5; renderRight.addChild(r1);
            }
            if(def.rewards.exp > 0) {
               let r2 = new PIXI.Text("+ " + def.rewards.exp + " Exp", {fontFamily:'Arial', fontSize:13, fill:0xFFFFFF});
               r2.x = 20; r2.y = r_y; r_y += r2.height + 5; renderRight.addChild(r2);
            }
            // Items
            if(def.rewards.items && def.rewards.items.length > 0) {
                def.rewards.items.forEach(it => {
                    let rit = new PIXI.Text("+ " + it.name + " (x" + it.quantity + ")", {fontFamily:'Arial', fontSize:13, fill:0xFFFFFF});
                    rit.x = 20; rit.y = r_y; r_y += rit.height + 5; renderRight.addChild(rit);
                });
            }
            
            renderRight.addChild(title, desc, objTitle, rewTitle);

            // Button Claim / Accept
            let btnW = 120, btnH = 30;
            let btn = new PIXI.Graphics();
            let color = st.status === "COMPLETED" ? 0x00FF00 : 0x666666;
            btn.beginFill(color, 1); btn.drawRect(0,0,btnW,btnH); btn.endFill();
            btn.x = right_width / 2 - btnW / 2;
            btn.y = right_panel.height - btnH - 10;
            
            let btnTxt = new PIXI.Text(st.status === "COMPLETED" ? "Nhận Thưởng" : "Đang làm...", {fontFamily:'Arial',fontSize:13,fill:0xFFFFFF,fontWeight:'bold'});
            btnTxt.x = btnW/2 - btnTxt.width/2; btnTxt.y = btnH/2 - btnTxt.height/2;
            btn.addChild(btnTxt);

            if (st.status === "COMPLETED") {
                btn.interactive = true; btn.cursor = 'pointer';
                btn.on('pointerdown', () => {
                    this.send('quest:claim', def.id);
                    this.notice(this._("Đã gửi yêu cầu nhận thưởng qua Server!"));
                    this.cache.activeQuestSelected = null;
                });
            }
            if (st.status === "IN_PROGRESS" && def.type === "talk") {
                let btnGoto = new PIXI.Graphics();
                btnGoto.beginFill(0xFFD700, 1); btnGoto.drawRect(0,0,btnW,btnH); btnGoto.endFill();
                btnGoto.x = btn.x; btnGoto.y = btn.y - 40;
                let goTxt = new PIXI.Text("Nói Chuyện Auto", {fontFamily:'Arial',fontSize:13,fill:0x000000,fontWeight:'bold'});
                goTxt.x = btnW/2 - goTxt.width/2; goTxt.y = btnH/2 - goTxt.height/2;
                btnGoto.addChild(goTxt);
                btnGoto.interactive = true; btnGoto.cursor = 'pointer';
                btnGoto.on('pointerdown', () => {
                    this.send('quest:talk', def.objectives[0].targetId); 
                    this.notice(this._("Đã Auto nói chuyện tương tác! Hãy kiểm tra tiến độ!"));
                });
                renderRight.addChild(btnGoto);
            }
            renderRight.addChild(btn);
            
        } else {
            let emptyTxt = new PIXI.Text("Xin mời chọn 1 Nhiệm Vụ", {fontFamily:'Arial',fontSize:14,fill:0xCCCCCC, fontWeight:'bold'});
            emptyTxt.x = right_width/2 - emptyTxt.width/2; emptyTxt.y = left_height/2 - emptyTxt.height/2;
            renderRight.addChild(emptyTxt);
        }

        right_panel.addChild(renderRight);

    }

    bando = (name = 'bando') => {
        let my = this.my;
        this.box.name_menu = name;
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);
        let body = this.box.getChildByName('body');

        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);

        let left_width = nen.width * 0.4;
        let right_width = nen.width * 0.6;
        let left_height = nen.height;

        let left_panel = new PIXI.Graphics();
        left_panel.beginFill(0xae9069, 1);
        left_panel.lineStyle(1,0x6a4b2a,1);
        left_panel.drawRect(0,0,left_width,left_height);
        left_panel.endFill();
        nen.addChild(left_panel);

        let right_panel = new PIXI.Graphics();
        right_panel.beginFill(0x856c4e, 1);
        right_panel.lineStyle(1,0x6a4b2a,1);
        right_panel.drawRect(0,0,right_width,left_height);
        right_panel.endFill();
        right_panel.x = left_width;
        nen.addChild(right_panel);

        // Fetch Server map data array passed upon joining session
        let mapList = this.listMap || [];
        let renderLeft = new PIXI.Container();
        let l_y = 5;

        mapList.forEach((m) => {
            let qbox = new PIXI.Graphics();
            let isCurrent = m.id === my.pos.map;
            qbox.beginFill(isCurrent ? 0x228B22 : 0x6a4b2a, 1);
            qbox.lineStyle(1, 0xFFFFFF, isCurrent ? 1 : 0.5);
            qbox.drawRect(0,0,left_width - 10, 45);
            qbox.endFill();
            qbox.x = 5;
            qbox.y = l_y;
            qbox.interactive = true;
            qbox.cursor = 'pointer';
            
            let txtName = new PIXI.Text(m.name, {fontFamily:'Arial',fontSize:13,fill:0xFFFFFF,fontWeight:'bold',wordWrap:true, wordWrapWidth:left_width - 15});
            txtName.x = 5; txtName.y = 5;
            
            let reqLevel = (m.config && m.config.levelRequired) ? m.config.levelRequired : 1;
            let locked = reqLevel > my.info.chiso.level;
            
            let reqText = locked ? ("Yêu cầu Lv: " + reqLevel) : (isCurrent ? "Đang ở đây" : "Có thể đến");
            let reqColor = locked ? 0xFF0000 : (isCurrent ? 0x00FF00 : 0xFFFFAA);
            
            let txtStatus = new PIXI.Text(reqText, {fontFamily:'Arial',fontSize:12,fill: reqColor});
            txtStatus.x = 5; txtStatus.y = 28;
            qbox.addChild(txtName, txtStatus);
            renderLeft.addChild(qbox);
            l_y += 50;

            qbox.on('pointerdown', () => { 
                this.cache.activeMapViewerSelected = m; 
                this.bando(); // Re-render the view
            });
        });

        let dummyLeftViewport = new PIXI.Container();
        dummyLeftViewport.addChild(renderLeft); 
        this.viewPointDefault(left_panel, dummyLeftViewport);

        let renderRight = new PIXI.Container();
        let selectedMap = this.cache.activeMapViewerSelected;
        if(selectedMap) {
            let title = new PIXI.Text(selectedMap.name, {fontFamily:'Arial', fontSize:17, fill:0xFFD700, fontWeight:'bold', wordWrap:true, wordWrapWidth:right_width-20});
            title.x = right_width / 2 - title.width / 2; 
            title.y = 10; 
            renderRight.addChild(title);

            let typeTxt = selectedMap.config && selectedMap.config.safeZone ? "Khu Vực An Toàn" : "Khu Vực Chiến Đấu";
            let typeColor = selectedMap.config && selectedMap.config.safeZone ? 0x00FF00 : 0xFF0000;
            let typeGUI = new PIXI.Text(typeTxt, {fontFamily:'Arial', fontSize:14, fill:typeColor, fontWeight:'bold'});
            typeGUI.x = right_width / 2 - typeGUI.width / 2;
            typeGUI.y = title.y + title.height + 5;
            renderRight.addChild(typeGUI);

            if(selectedMap.bg) {
                // Read from cache assets dynamically mapped from bg config flag
                let mapImg = new PIXI.Sprite(this.coverImg(selectedMap.bg));
                let iW = right_width - 20;
                let scale = iW / (mapImg.width || 100);
                mapImg.width = iW;
                mapImg.height = (mapImg.height || 100) * scale;
                mapImg.x = 10;
                mapImg.y = typeGUI.y + typeGUI.height + 10;
                renderRight.addChild(mapImg);
            } else {
                let noImgTxt = new PIXI.Text("Chưa quét được dữ liệu hải đồ", {fontFamily:'Arial',fontSize:13,fill:0xCCCCCC});
                noImgTxt.x = right_width / 2 - noImgTxt.width / 2;
                noImgTxt.y = typeGUI.y + typeGUI.height + 30;
                renderRight.addChild(noImgTxt);
            }
        } else {
            let emptyTxt = new PIXI.Text("Chọn 1 Đảo để xem Hải Đồ", {fontFamily:'Arial',fontSize:14,fill:0xCCCCCC, fontWeight:'bold'});
            emptyTxt.x = right_width/2 - emptyTxt.width/2; emptyTxt.y = left_height/2 - emptyTxt.height/2;
            renderRight.addChild(emptyTxt);
        }

        right_panel.addChild(renderRight);

    }
}