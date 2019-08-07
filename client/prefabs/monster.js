import * as PIXI from 'pixi.js';
import { SPRITES } from '../utils/assets.js';
import { randomIntFromInterval } from '../utils/helpers.js';

let types = Object.keys(SPRITES.MONSTERS);
export default function (app, reload) {
    let type = randomIntFromInterval(0, types.length - 1);
    let monster = new PIXI.Sprite(app.loader.resources[SPRITES.MONSTERS[types[type]]].texture);
    monster.anchor.set(0.5, 0.5);

    return monster;
}