import * as PIXI from 'pixi.js';

export default function (app) {
    let background = new PIXI.Graphics();
    background.lineStyle(10, 0x333638, 1);
    background.beginFill(0x3e4144);
    background.drawRoundedRect(0, 0, 830, 480, 10);
    background.endFill();
    background.pivot.set(background.width / 2, background.height / 2);

    return background;
}
