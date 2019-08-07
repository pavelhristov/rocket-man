import * as PIXI from 'pixi.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import Entity from './contracts/entity.js';
import '../utils/typedef.js';

/**
 * Creates Raindrop Ripple game entity.
 * 
 * Raindrop Ripple scales up and fades away in time, used for user click interaction.
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default class RainDropRippleEntity extends Entity {
    constructor(app) {
        let circle = new PIXI.Graphics();
        circle.lineStyle(0.8, 0xFF0000);
        circle.drawCircle(0, 0, 3);
        circle.endFill();
        super(app, circle, DISPLAY_OBJECT_TYPE.GRAPHICS);
        this.addComponent('transform', {
            alpha: {
                value: -0.04,
                min: 0,
                onmin: () => {
                    this.removeComponent('transform');
                    this.destroy();
                }
            },
            scale: { x: 0.25, y: 0.25 }
        });
    }
}