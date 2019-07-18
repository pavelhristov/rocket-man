const context = require.context('./', true, /^(?!.*index*$)(\.\/[a-zA-Z]+$)/i);
const levels = {};

context.keys().forEach((filename) => {
    let imported = context(filename);
    let name = filename.substring(2);
    levels[name] = imported.default || imported[name];
});

export default levels;
