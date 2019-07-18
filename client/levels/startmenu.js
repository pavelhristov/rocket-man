import * as PIXI from 'pixi.js';

export default function (app, { onstart }) {
    let menu = new PIXI.Container();
    menu.x = app.screen.width / 2;
    menu.y = app.screen.height / 2;
    menu.pivot.x = menu.width / 2;
    menu.pivot.y = menu.height / 2;

    let background = new PIXI.Graphics();
    background.lineStyle(10, 0x333638, 1);
    background.beginFill(0x3e4144);
    background.drawRoundedRect(0, 0, 830, 480, 10);
    background.endFill();
    background.pivot.set(background.width / 2, background.height / 2);
    menu.addChild(background);

    let btnStartGame = createMenuButton('Start Game', onstart);
    menu.addChild(btnStartGame);

    function createMenuButton(text, clickHandler) {
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

    return { container: menu };
}