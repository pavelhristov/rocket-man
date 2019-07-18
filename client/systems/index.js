const context = require.context('./', true, /^(?!.*index*$)(\.\/[a-zA-Z]+$)/i);
const systems = {};

context.keys().forEach((filename) => {
    let imported = context(filename);
    let name = filename.substring(2);
    systems[name] = new (imported.default || imported[name])();
});

export default systems;
