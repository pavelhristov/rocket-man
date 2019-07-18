import * as PIXI from 'pixi.js';

export function createGradientTexture(colors, width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, width, 0);
    colors.forEach((c) => gradient.addColorStop(c.position, c.color));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(width, height / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, height);
    ctx.fill();

    return PIXI.Texture.from(canvas);
}
