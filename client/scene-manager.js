import levels from './levels';
import systems from './systems';

export default function (app) {
    let currentScene;

    return {
        loadScene(name) {
            let scene = levels[name];
            if (!scene) {
                console.error(`Scene ${name} does not exist!`);
                return;
            }

            currentScene = scene(app, systems);
            app.stage.removeChildren();
            app.stage.addChild(currentScene.container);
        },
        updateScene(delta) {
            if (currentScene && currentScene.update) {
                currentScene.update(delta);
            }
        }
    };
}
