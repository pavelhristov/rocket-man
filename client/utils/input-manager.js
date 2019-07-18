/**
 * Simple abstraction over dom events.
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Object} input manager
 */
export default function (app) {
    const documentEvents = {};
    const canvasEvents = {};
    const state = {};

    function bindEvent(event, handler, isCanvas) {
        if (isCanvas) {
            canvasEvents[event] ? canvasEvents[event].push(handler) : canvasEvents[event] = [handler];
            app.view.addEventListener(event, handler);
        } else {
            documentEvents[event] ? documentEvents[event].push(handler) : documentEvents[event] = [handler];
            document.addEventListener(event, handler);
        }
    }

    function unbindEvent(event, isCanvas) {
        if (isCanvas && canvasEvents[event]) {
            canvasEvents[event].forEach(e => app.view.removeEventListener(event, e));
            delete canvasEvents[event];
        } else if (documentEvents[event]) {
            documentEvents[event].forEach(e => document.removeEventListener(event, e));
            delete documentEvents[event];
        }
    }

    function unbindHandler(event, handler, isCanvas) {
        if (isCanvas && canvasEvents[event]) {
            app.view.removeEventListener(event, handler);
            let index = canvasEvents[event].indexOf(handler);
            if (index > -1) {
                canvasEvents[event].splice(index, 1);
            }
        } else if (documentEvents[event]) {
            document.removeEventListener(event, handler);
            let index = documentEvents[event].indexOf(handler);
            if (index > -1) {
                documentEvents[event].splice(index, 1);
            }
        }
    }

    return {
        bindEvent,
        unbindEvent,
        unbindHandler,
        state
    };
}