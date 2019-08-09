class Img {
    constructor(imgsrc) {
        let img = new Image();
        img.src = imgsrc;
        this.img = img;
    }
    get() {
        return this.img;
    }
}

let hudImg = new Img("img/hud.png");
let healthImg = new Img("img/health.png");

function enemyCollide(x, y, sender) {
    for (let [id, el] of enemies.entries()) {
        if ((x > el.x && x < el.x + 60) && (y > el.y && y < el.y + 60) && sender != el) {
            return id;
        }
    }
}

class Game {
    constructor() {
        let hudHeight = parseInt((innerHeight / 2) / 60 - 2) * 60;

        this.canvas = document.createElement("canvas");
        this.width = this.canvas.width = innerWidth;
        this.height = this.canvas.height = innerHeight - hudHeight;

        this.hud = document.createElement("canvas");
        this.hud.width = this.width;
        this.hud.height = hudHeight;

        this.chestFunc = function(){};

        this.view = document.createElement("div");
        this.view.append(this.hud, this.canvas)
        this._renderFuncs = [];
        this._render();

        this.paused = false;

    }

    pause() {
        this.paused = !this.paused;
    }

    ctx_h() {
        return this.hud.getContext("2d");
    }

    ctx() {
        return this.canvas.getContext("2d");
    }

    render(func) {
        this._renderFuncs.push(func);
    }

    on(event, func) {
        document.addEventListener(event, e => func(e));
    }

    _render() {
        if(!this.paused) {
            
            this.ctx().clearRect(0, 0, this.canvas.width, this.canvas.height);
            renderHUD(this.ctx_h(), this.hud);
            for (let el of this._renderFuncs)
                el();
        }
        this.chestFunc();
        requestAnimationFrame(this._render.bind(this));        
    }

    chest(n) {
        if(opened.includes(n))
            return;
        opened.push(n)

        this.pause();

        this.chestOpened = true;

        let i = 0;
        let ptr = (40 / 180) * this.height;

        let f = e => {
            if(e.key == "ArrowDown") {
                i++;
                i %= 3;
                ptr = (40 / 180) * this.height * (i + 1);
            }

            if(e.key == "ArrowUp") {
                i--;
                if(i < 0)
                    i = 2;
                ptr = (40 / 180) * this.height * (i + 1);
            }

            if(e.key == "Enter") {
                this.paused = false;
                player.model[spells[i]] += chests[n][i];         
                this.chestFunc = () => {};
                document.removeEventListener("keydown", f)
            }
        }

        document.addEventListener("keydown", f)

        this.chestFunc = () => {
            if(this.chestOpened) {
                this.ctx().fillRect(0, 0, this.width, this.height)
                let offset = 0;
                for(let [id, asset] of chests[n].entries()) {
                    let img = new Img(`img/${id}.png`);
                    let pointer = new Img(`img/pointer.png`);
                    offset += (40 / 180) * this.height;
    
                    this.ctx().drawImage(img.get(), (30/320) * this.width, offset, (220/320) * this.width, (20/180) * this.height)
                    for(let [pos, no] of [...asset.toString()].entries()) {
                        if(no == 0)
                            no = 10;
                        num.draw(this.ctx(), (260/320) * this.width + pos * (10/320) * this.width, offset, no || 10, 1);
                    }
                    this.ctx().drawImage(pointer.get(), (1/320) * this.width, ptr, (20/320) * this.width, (10/180) * this.height)
                }
            }
            
        }
    }
}

function getTile(x, y) {
    let tx = parseInt(x / 64);
    let ty = parseInt(y / 64);
    if (game.map)
        return [game.map[ty][tx], {
            x: parseInt(x / 64) * 64,
            y: parseInt(y / 64) * 64
        }, {
            x, y
        }];
}

function collision(x, y, sender) {
    [tile, pos, pt] = getTile(x, y);
    if (tile == 0) { }

    if (tile == 1) {
        return true;
    }

    if (tile == 2) {
        return true;
    }

    if (tile == 3) {
        if (pt.y < pos.y + 48) {
            return true;
        }
    }

    if (tile == 4) {
        if (pt.y > pos.y + 32) {
            return true;
        }
    }

    if (tile == 5) {
        if (pt.y < pos.y + 32) {
            return true;
        }
    }

    if (tile == 6) {
        if (sender && sender.hp > 0) {
            sender.hp -= 0.25;
        }
    }

    if (tile == 7) {
        if (!(pt.x < pos.x + 32 && pt.y < pos.y + 32)) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 8) {
        if (!(pt.x < pos.x + 32 && pt.y > pos.y + 32)) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 9) {
        if (!(pt.x > pos.x + 32 && pt.y > pos.y + 32)) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 10) {
        if (!(pt.x > pos.x + 32 && pt.y < pos.y + 32)) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 11) {
        if (pt.y > pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 12) {
        if (pt.y < pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 13) {
        if (pt.x < pos.x + 32 && pt.y < pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 14) {
        if (pt.x < pos.x + 32 && pt.y > pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 15) {
        if (pt.x > pos.x + 32 && pt.y < pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 16) {
        if (pt.x > pos.x + 16 && pt.x < pos.x + 48) {
            return true;
        }
    }

    if (tile == 17) {
        if (pt.y > pos.y + 16 && pt.y < pos.y + 48) {
            return true;
        }
    }

    if (tile == 18) {
        if (pt.y > pos.y + 16 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }

        if (pt.x > pos.x + 16 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 19) {
        if (pt.y > pos.y + 16 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }

        if (pt.x < pos.x + 48 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 20) {
        if (pt.y < pos.y + 48 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }

        if (pt.x > pos.x + 16 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 21) {
        if (pt.y < pos.y + 48 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }

        if (pt.x < pos.x + 48 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 22) {
        if (pt.y < pos.y + 48 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }
    }

    if (tile == 23) {
        if (pt.x > pos.x + 16 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 24) {
        if (pt.x < pos.x + 48 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 25) {
        if (pt.y > pos.y + 16 && (pt.x > pos.x + 16 && pt.x < pos.x + 48)) {
            return true;
        }
    }

    if (tile == 26) {
        if (pt.x > pos.x + 16 && (pt.y > pos.y + 16 && pt.y < pos.y + 48)) {
            return true;
        }
    }

    if (tile == 27) { }

    if (tile == 28) { }

    if (tile == 29) {
        game._renderFuncs = [];
        game.chestFunc = () => {
            let go = new Img("img/win.png")
            game.ctx().drawImage(go.img, 0, 0, game.width, game.height);
        }
    }

    if (tile == 30) {
        if (pt.y < pos.y + 32 && pt.x < pos.x + 48) {
            if(sender == player) {
                openChest(pos.x / 64, pos.y / 64);
            }
            return true;
        }
    }

    if (tile == 31) { }

    if (tile == 32) {
        if (pt.x > pos.x + 16 && pt.x < pos.x + 48) {
            return true;
        }
    }

    if (tile == 33) {
        if (pt.y > pos.y + 32) {
            if (sender && sender.hp > 0) {
                sender.hp -= 0.25;
            }
        }
    }

    if (tile == 34) { }

    if (tile == 35) {
        if (sender && sender.hp < 100) {
            sender.hp += 0.25;
        }
    }

    if (tile == 36) {
        if (pt.y > pos.y + 16 && pt.y < pos.y + 48) {
            return true;
        }
    }

    return false;
}

function renderHUD(c, h) {
    if (player) {
        c.fillStyle = "#0d0d0d";
        c.fillRect(0, 0, h.width, h.height);
        c.drawImage(hudImg.get(), 0, 0, h.width, h.height)
        const X = 64 / 320;
        const Y = 23 / 60;
        const C_W = player.hp / player.MAX_HP;
        const M_W = 64 / 320;
        const H = 7 / 60;
        let offset = null;
        for (let n in player.model) {
            if (n == "water")
                offset = (147 / 320) * h.width;
            else if (n == "fire")
                offset = (170 / 320) * h.width;
            else if (n == "electricity")
                offset = (193 / 320) * h.width;
            for (let el of [...player.model[n].toString()]) {
                if (el == 0)
                    el = 10
                num.draw(c, offset, (2 / 3) * h.height, el, 1)
                offset += (7 / 320) * h.width;
            }
        }

        try {
            c.drawImage(healthImg.get(),
                0, 0,
                C_W * healthImg.get().width,
                healthImg.get().height,
                X * h.width,
                Y * h.height,
                C_W * M_W * h.width,
                H * h.height)
        }
        catch (ex) {
            game._renderFuncs = [];
            game.chestFunc = () => {
                let go = new Img("img/go.png")
                game.ctx().drawImage(go.img, 0, 0, game.width, game.height);
            }
        }
    }
}

class Character {
    constructor(img, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.i = img;
    }
}

class Player extends Character {
    constructor(img, keys) {
        let x = 64;

        let y = 64;

        super(img, x, y, img.sep_x, img.sep_y);

        this.MAX_HP = 100;
        this.hp = this.MAX_HP;

        let up, down, left, right;

        let i = 0;

        let anim = 44;

        let speed = 3;

        this.model = {
            water: 50,
            fire: 50,
            electricity: 50
        }

        game.on("keydown", e => {
            if (e.key == keys.down)
                down = true;
            if (e.key == keys.up)
                up = true;
            if (e.key == keys.right)
                right = true;
            if (e.key == keys.left)
                left = true;

            if (e.key == keys.shoot) {
                if (player.model[current_spell] > 0) {
                    bullet.fire();
                }
            }

            if (e.key == keys.change) {
                current_spell = spells[spells.indexOf(current_spell) + 1] || spells[0];
            }
        })

        game.on("keyup", e => {
            if (e.key == keys.down)
                down = false;
            if (e.key == keys.up)
                up = false;
            if (e.key == keys.right)
                right = false;
            if (e.key == keys.left)
                left = false;
        })

        let spr_x = 1;
        let spr_y = 1;

        this.direction = 'n';

        game.render(() => {
            let it = false;
            let st = {
                x, y
            }
            if (down && (!collision(x + 13, y + speed + 41, this) && !collision(x + 35, y + speed + 41, this))) {
                y += speed;
                spr_x = 2;
                it = true;
                this.direction = 's';
            }
            if (up && (!collision(x + 13, y - speed + 41, this) && !collision(x + 35, y - speed + 41, this))) {
                y -= speed;
                spr_x = 1;
                it = true;
                this.direction = 'n';
            }
            if (right && (!collision(x + speed + 13, y + 41, this) && !collision(x + speed + 35, y + 41, this))) {
                x += speed;
                spr_x = 3;
                it = true;
                this.direction = 'e';
            }
            if (left && (!collision(x - speed + 13, y + 41, this) && !collision(x - speed + 35, y + 41, this))) {
                x -= speed;
                spr_x = 4;
                it = true;
                this.direction = 'w';
            }

            if (it)
                i++;

            if (i > 4) {
                i = 0;
                if (spr_y == 1)
                    spr_y = 2
                else
                    spr_y = 1;
            }

            if( enemyCollide(this.x, this.y) !== undefined||
                enemyCollide(this.x, this.y + 44) !== undefined||
                enemyCollide(this.x + 42, this.y) !== undefined||
                enemyCollide(this.x + 42, this.y + 44) !== undefined||
                enemyCollide(this.x + 21, this.y + 44) !== undefined|| 
                enemyCollide(this.x + 21, this.y) !== undefined) {
                    x = st.x;
                    y = st.y;
                    this.hp -= 0.25;
            }

            this.x = x;
            this.y = y;

            let offsetX = x;
            let offsetY = y;

            let paddingX = x + game.width / 2 > cols * 64

            if (x > game.width / 2)
                offsetX = game.width / 2;
            if (x > cols * 64 - game.width / 2)
                offsetX = game.width / 2 + x % (cols * 64 - game.width / 2);

            if (y > game.height / 2)
                offsetY = game.height / 2;
            if (y + game.height / 2 > rows * 64)
                offsetY = game.height / 2 + y % (rows * 64 - game.height / 2);

            collision(x + 22, y + 41, this);

            img.draw(game.ctx(), offsetX, offsetY, spr_y, spr_x)
        })
    }
}

class Map {
    constructor(json) {
        game.map = json;
        for (let [height, row] of json.entries()) {
            rows++;
            cols = 0;
            for (let [width, cell] of row.entries()) {
                cols++;
                let tile = new Img(`img/${cell}.jpg`);
                if(cell == 0) {
                    grounds.push({
                        x: width,
                        y: height
                    })
                }
                game.render(() => {
                    let offsetX = 0;
                    let offsetY = 0;

                    if (player.x > game.width / 2)
                        offsetX = player.x - game.width / 2;
                    if (player.x + game.width / 2 > cols * 64)
                        offsetX = cols * 64 - game.width

                    if (player.y > game.height / 2)
                        offsetY = player.y - game.height / 2;
                    if (player.y + game.height / 2 > rows * 64)
                        offsetY = rows * 64 - game.height

                    game.ctx().drawImage(tile.get(), width * 64 - offsetX, height * 64 - offsetY)
                });
            }
        }
    }
}

class Sprite {
    constructor(img, sep_x, sep_y) {
        this.img = img.get();
        this.sx = sep_x;
        this.sy = sep_y;
    }

    draw(c, posx, posy, x, y) {
        c.drawImage(this.img,
            this.sx * (x - 1),
            this.sy * (y - 1),
            this.sx,
            this.sy,
            posx,
            posy,
            this.sx,
            this.sy)
    }
}

class Projectile {
    constructor(ctx) {
        this.c = ctx;
    }

    fire() {
        if (!this.fired) {
            this.startX = this.x = player.x + 21;
            this.startY = this.y = player.y + 22;
            this.dir = player.direction;
            this.img = new Img(`img/${current_spell}.png`).get();
            player.model[current_spell]--;
            this.fired = true;
        }
    }

    update() {
        if (this.fired) {
            if (this.dir == 'n')
                this.y -= 5;
            else if (this.dir == 's')
                this.y += 5;
            else if (this.dir == 'e')
                this.x += 5;
            else if (this.dir == 'w')
                this.x -= 5;

            let e = enemyCollide(this.x, this.y) || 
                    enemyCollide(this.x + 8, this.y) ||
                    enemyCollide(this.x, this.y + 8) ||
                    enemyCollide(this.x + 8, this.y + 8);

            if (collision(this.x + 4, this.y + 4) ||
                (this.dir == 'n' && this.y < this.startY - 64 * 6) ||
                (this.dir == 's' && this.y > this.startY + 64 * 6) ||
                (this.dir == 'e' && this.x > this.startX + 64 * 6) ||
                (this.dir == 'w' && this.x < this.startX - 64 * 6)) {
                    this.fired = false;
            }
            else if(e !== undefined) {
                enemies.splice(e, 1);
                this.fired = false;
            }

            let offsetX = 0;
            let offsetY = 0;

            if (player.x > game.width / 2)
                offsetX = player.x - game.width / 2;
            if (player.x + game.width / 2 > cols * 64)
                offsetX = cols * 64 - game.width

            if (player.y > game.height / 2)
                offsetY = player.y - game.height / 2;
            if (player.y + game.height / 2 > rows * 64)
                offsetY = rows * 64 - game.height
            this.c.drawImage(this.img, this.x - offsetX, this.y - offsetY);
        }
    }
}

class Enemy {
    constructor(type, x, y) {
        this.img = new Img(`img/${type}.png`);
        this.x = x;
        this.y = y;
        enemies.push(this);
    }

    update(ctx) {
        let offsetX = 0;
        let offsetY = 0;

        let distance = Math.hypot(
            Math.max(this.x, player.x) - Math.min(this.x, player.x), 
            Math.max(this.y, player.y) - Math.min(this.y, player.y)
        );

        if (player.x > game.width / 2)
            offsetX = player.x - game.width / 2;
        if (player.x + game.width / 2 > cols * 64)
            offsetX = cols * 64 - game.width

        if (player.y > game.height / 2)
            offsetY = player.y - game.height / 2;
        if (player.y + game.height / 2 > rows * 64)
            offsetY = rows * 64 - game.height

        if(distance < 200){
            if(distance > 40) {
                if(Math.abs(player.x) < Math.abs(this.x) && !collision(this.x, this.y + 20)) 
                    this.x--;
                else if(Math.abs(player.x) > Math.abs(this.x) && !collision(this.x + 40, this.y + 20))
                    this.x++;

                if(Math.abs(player.y) < Math.abs(this.y) && !collision(this.x + 20, this.y))
                    this.y--;
                else if(Math.abs(player.y) > Math.abs(this.y) && !collision(this.x + 20, this.y + 40))
                    this.y++;
                this.dir = 5;
            }
        } 
        else if(this.dir == 5)
            this.dir = parseInt(Math.random() * 4) + 1;
        
        if (!this.startPos || (this.startPos.x > this.x + 64) || (this.startPos.x < this.x - 64) || (this.startPos.y > this.y + 64) ||
            collision(this.x + 21, this.y) || collision(this.x, this.y + 21) || collision(this.x + 42, this.y + 21) || collision(this.x + 21, this.y + 42) ||
            enemyCollide(this.x + 21, this.y, this) || enemyCollide(this.x, this.y + 21, this) || enemyCollide(this.x + 42, this.y + 21, this) || enemyCollide(this.x + 21, this.y + 42, this) ) {
            this.startPos = {
                x: this.x,
                y: this.y
            }

            if (this.dir == 3)
                this.x--;
            else if (this.dir == 1)
                this.x++;
            else if (this.dir == 2)
                this.y--;
            else if (this.dir == 4)
                this.y++;

            this.dir = parseInt(Math.random() * 4) + 1;
        }


        if (this.dir == 3)
            this.x++;
        else if (this.dir == 1)
            this.x--;
        else if (this.dir == 2)
            this.y++;
        else if (this.dir == 4)
            this.y--;

        ctx.drawImage(this.img.get(), this.x - offsetX, this.y - offsetY);
    }
}

function openChest(x, y) {
    if(x == 8 && y == 3)
        game.chest(0);
    if(x == 14 && y == 1)
        game.chest(1);
    if(x == 22 && y == 1)
        game.chest(2);
    if(x == 29 && y == 5)
        game.chest(3)
    if(x == 28 && y == 2)
        game.chest(4)
    if(x == 26 && y == 11)
        game.chest(6)
    if(x == 21 && y == 13)
        game.chest(7)
    if(x == 28 && y == 13)
        game.chest(8)
    if(x == 11 && y == 10)
        game.chest(9)
    if(x == 3 && y == 10)
        game.chest(10);

}