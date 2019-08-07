import scenes from './scenes';

export default function (app) {
    let currentScene;

    return {
        loadScene(name) {
            let scene = scenes[name];
            if (!scene) {
                console.error(`Scene ${name} does not exist!`);
                return;
            }

            if (currentScene) {
                for (const sys in app.systems) {
                    app.systems[sys]._entities.forEach(e => { app.systems[sys].remove(e); e.destroy(); });
                }
                app.stage.removeChild(currentScene.container);
            }

            currentScene = scene(app);
            app.stage.addChild(currentScene.container);
        },
        updateScene(delta) {
            if (currentScene && currentScene.update) {
                currentScene.update(delta);
            }
        }
    };
}
