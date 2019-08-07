import * as PIXI from 'pixi.js';
import { SPRITES } from '../utils/assets.js';

let frames;
export default function (app, reload) {
    if (!frames || reload) {
        frames = [];
        let baseTexture = app.loader.resources[SPRITES.ROCKET].texture.baseTexture;
        for (let i = 0; i < 4; i++) {
            let width = baseTexture.width / 4;
            let t = new PIXI.Texture(baseTexture, new PIXI.Rectangle(width * i, 0, width, baseTexture.height));
            frames.push(t);
        }
    }

    let rocket = new PIXI.AnimatedSprite(frames);
    rocket.velocity = 10;
    rocket.animationSpeed = 0.25;
    rocket.play();

    return rocket;
}