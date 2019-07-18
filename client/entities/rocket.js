import rocketPrefab from '../prefabs/rocket.js';
import explosionPrefab from '../prefabs/explosion.js';

export default function (app) {
    let rocket = rocketPrefab(app);
    rocket.entity = {
        displayObject: rocket,
        type: 'sprite',
        components: {
            movement: {
                speed: 10,
                onstopmoving: () => {
                    let explosion = explosionPrefab(app);
                    explosion.position.set(rocket.x, rocket.y);
                    explosion.play();
                    rocket.parent.addChild(explosion);

                    delete rocket.entity;
                    rocket.gotoAndStop(0);
                    rocket.parent.removeChild(rocket);
                    rocket.destroy();
                }
            }
        }
    };

    return rocket.entity;
}