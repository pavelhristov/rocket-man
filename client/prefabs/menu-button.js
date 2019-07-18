import * as PIXI from 'pixi.js';

export default function (app, text, clickHandler) {
    let container = new PIXI.Container();
    let button = new PIXI.Graphics();
    button.beginFill(0x8bc558);
    button.drawRoundedRect(0, 0, 330, 60, 5);
    button.endFill();
    button.pivot.set(button.width / 2, button.height / 2);
    container.addChild(button);

    let style = new PIXI.TextStyle({ fontSize: 32, fill: 'white' });
    let buttonText = new PIXI.Text(text, style);
    button.addChild(buttonText);
    buttonText.anchor.set(0.5, 0.5);
    container.addChild(buttonText);

    button.interactive = true;
    button.buttonMode = true;
    button.addListener('pointerup', clickHandler);

    return container;
}