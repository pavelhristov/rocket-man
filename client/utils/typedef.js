
/**
 * @typedef {Object} Entity game entity that can interract with game systems based on the attached components
 * @property {PIXI.DisplayObject} displayObject entity display object
 * @property {DISPLAY_OBJECT_TYPE} type displayObject type
 * @property {Object} components components attached to the object
 * @property {Array} [children] child PIXI.DisplayObject that need to be attached alongised the displayObject
 * @property {Object} [methods] actions to interract with the entity
 */

/**
 * @typedef {Object} Level game level object
 * @property {PIXI.Container} container container that holds level's entities to be added to the stage
 * @property {function} play game loop for the level
 */

/**
 * @typedef {Object} Point
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef {Objectt} GradientColorPoint
 * @property {Number} position position in the gradient between 0 and 1
 * @property {String} color color value
 */
