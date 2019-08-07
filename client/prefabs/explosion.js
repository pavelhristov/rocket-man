import * as PIXI from 'pixi.js';
import { SPRITES } from '../utils/assets.js';

let frames;
export default function (app, reload) {
    if (!frames || reload) {
        frames = [];
        let baseTexture = app.loader.resources[SPRITES.EXPLOSION].texture.baseTexture;
        let width = baseTexture.width / 40;
        for (let i = 0; i < 40; i++) {
            let t = new PIXI.Texture(baseTexture, new PIXI.Rectangle(width * i, 0, width, baseTexture.height));
            frames.push(t);
        }
    }

    var explosion = new PIXI.AnimatedSprite(frames);
    explosion.anchor.set(0.5, 0.5);
    explosion.animationSpeed = 0.3;
    explosion.loop = false;

    return explosion;
}
