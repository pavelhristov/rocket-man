import * as PIXI from 'pixi.js';

export default function (app) {
    let circle = new PIXI.Graphics();
    circle.lineStyle(0.8, 0xFF0000);
    circle.drawCircle(0, 0, 3);
    circle.endFill();

    circle.entity = {
        displayObject: circle,
        type: 'graphics',
        components: {
            transform: {
                alpha: {
                    value: -0.04,
                    min: 0,
                    onmin: () => {
                        delete circle.entity.components.transform;
                        delete circle.entity;
                        circle.parent.removeChild(circle);
                        circle.destroy();
                    }
                },
                scale: { x: 0.25, y: 0.25 }
            }
        }
    };

    return circle.entity;
}