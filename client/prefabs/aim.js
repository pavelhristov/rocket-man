import * as PIXI from 'pixi.js';
import { createGradientTexture } from '../utils/helpers.js';

export default function (app) {
    let gradient = createGradientTexture([
        { position: 0, color: '#8d1515' },
        { position: 1, color: 'rgba(255, 255, 255, 0)' }
    ], 800, 1);
    let line = PIXI.Sprite.from(gradient);

    return line;
}