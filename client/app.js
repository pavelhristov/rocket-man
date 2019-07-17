import * as PIXI from 'pixi.js';
import vec2 from './math/vec2.js';

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({ width: 1024, height: 512, antialias: true, backgroundColor: 0x252729 });

document.body.appendChild(app.view);


const SPRITES = {
    SNIPER: 'assets/sniper.png',
    ROCKET: 'assets/rocket.png',
    EXPLOSION: 'assets/explosion.png'
};

let state, rocketMan, line, message, circles;
app.loader
    .add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION])
    .on('progress', loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log('loading: ' + resource.url);
    console.log('progress: ' + loader.progress + '%');
}

function setup() {
    let frames = [];
    for (let i = 0; i < 8; i++) {
        let width = i === 7 ? 52 : 53;
        let t = new PIXI.Texture(app.loader.resources[SPRITES.SNIPER].texture.baseTexture, new PIXI.Rectangle(53 * i, 0, width, 63));
        frames.push(t);
    }

    rocketMan = new PIXI.AnimatedSprite(frames);
    rocketMan.position.set(230, 230);
    //rocketMan.anchor.x = 0.27;
    rocketMan.pivot.x = 14;
    rocketMan.velocity = 3;
    rocketMan.animationSpeed = 0.25;
    rocketMan.rockets = [];
    app.stage.addChild(rocketMan);

    line = new PIXI.Graphics();
    line.lineStyle(1, 0x8d1515, 1);
    line.moveTo(0, 1);
    line.lineTo(0, -500);
    line.x = 230;
    line.y = 230;
    app.stage.addChild(line);

    let style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 'white',
        stroke: '#ff3300',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
    });
    message = new PIXI.Text('Hello Pixi!', style);
    message.position.set(5, 5);
    app.stage.addChild(message);

    circles = [];
    app.view.addEventListener('contextmenu', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        rocketMan.target = target;
        rocketMan.play();

        let circle = new PIXI.Graphics();
        circle.lineStyle(0.8, 0xFF0000);
        circle.drawCircle(0, 0, 3);
        circle.endFill();

        circle.position.set(target.x, target.y);
        app.stage.addChild(circle);
        circles.push(circle);

        // let circleTexture = app.renderer.generateTexture(circle,);
        // let circleSprite = new PIXI.Sprite(circleTexture);
        // circleSprite.anchor.set(0.5, 0.5);

        // circleSprite.position.set(target.x, target.y);
        // app.stage.addChild(circleSprite);
        // circles.push(circleSprite);

        ev.preventDefault();
        return false;
    });

    app.view.addEventListener('click', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        shoot(target);
    });

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    let direction = new vec2({ x: rocketMan.x, y: rocketMan.y }, app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage));
    let rotation = vec2.normalY().negate().angleTo(direction);
    rocketMan.rotation = rotation;
    line.rotation = rotation;

    if (rocketMan.target) {
        let path = new vec2({ x: rocketMan.x, y: rocketMan.y }, rocketMan.target);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < rocketMan.velocity) {
            rocketMan.gotoAndStop(0);
            delete rocketMan.target;
        } else {
            vec2.negate(vec2.normalize(dir));
            rocketMan.x += dir.x * rocketMan.velocity * delta;
            rocketMan.y += dir.y * rocketMan.velocity * delta;
            line.x += dir.x * rocketMan.velocity * delta;
            line.y += dir.y * rocketMan.velocity * delta;
        }
    }

    rocketMan.rockets.forEach((r, index, object) => {
        let path = new vec2({ x: r.x, y: r.y }, r.target);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < r.velocity) {
            explode(r.target);
            r.gotoAndStop(0);
            object.splice(index, 1);
            r.destroy();
        } else {
            vec2.negate(vec2.normalize(dir));
            r.x += dir.x * r.velocity * delta;
            r.y += dir.y * r.velocity * delta;
        }
    });

    circles.forEach((c, index, object) => {
        if (c.alpha <= 0) {
            object.splice(index, 1);
            c.destroy();
            return;
        }

        c.scale.x += 0.3;
        c.scale.y += 0.3;
        c.alpha -= 0.05;
    });
}

function shoot(target) {
    let frames = [];
    let baseTexture = app.loader.resources[SPRITES.ROCKET].texture.baseTexture;
    for (let i = 0; i < 4; i++) {
        let width = baseTexture.width / 4;
        let t = new PIXI.Texture(baseTexture, new PIXI.Rectangle(width * i, 0, width, baseTexture.height));
        frames.push(t);
    }

    let rocket = new PIXI.AnimatedSprite(frames);
    rocket.x = rocketMan.x;
    rocket.y = rocketMan.y;
    rocket.rotation = rocketMan.rotation;
    rocket.velocity = 10;
    rocket.animationSpeed = 0.25;
    rocket.target = target;
    rocket.play();
    rocketMan.rockets.push(rocket);
    app.stage.addChild(rocket);
}

function explode(position) {
    let frames = [];
    let baseTexture = app.loader.resources[SPRITES.EXPLOSION].texture.baseTexture;
    let width = baseTexture.width / 40;
    for (let i = 0; i < 40; i++) {
        let t = new PIXI.Texture(baseTexture, new PIXI.Rectangle(width * i, 0, width, baseTexture.height));
        frames.push(t);
    }

    var explosion = new PIXI.AnimatedSprite(frames);
    explosion.anchor.set(0.5, 0.5);
    explosion.position.set(position.x, position.y);
    explosion.loop = false;
    explosion.play();
    explosion.onComplete = function () { this.destroy(); };
    app.stage.addChild(explosion);
}

