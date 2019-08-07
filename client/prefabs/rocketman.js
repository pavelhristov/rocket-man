import * as PIXI from 'pixi.js';
import { SPRITES } from '../utils/assets.js';

let frames;
export default function (app, reload) {
    if (!frames || reload) {
        frames = [];
        for (let i = 0; i < 8; i++) {
            let width = i === 7 ? 52 : 53;
            let t = new PIXI.Texture(app.loader.resources[SPRITES.SNIPER].texture.baseTexture, new PIXI.Rectangle(53 * i, 0, width, 63));
            frames.push(t);
        }
    }

    let rocketMan = new PIXI.AnimatedSprite(frames);
    //rocketMan.anchor.x = 0.27;
    rocketMan.pivot.x = 14;
    rocketMan.animationSpeed = 0.25;

    return rocketMan;
}
