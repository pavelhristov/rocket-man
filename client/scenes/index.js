const context = require.context('./', true, /^(?!.*index*$)(\.\/[a-zA-Z]+$)/i);
const scenes = {};

context.keys().forEach((filename) => {
    let imported = context(filename);
    let name = filename.substring(2);
    scenes[name] = imported.default || imported[name];
});

export default scenes;
