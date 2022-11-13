"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = exports.DefaultContainer = void 0;
var blockchain_1 = require("./blockchain");
var constants_1 = require("./constants");
exports.DefaultContainer = Object.freeze({
    bcConnector: new blockchain_1.NearConnector(constants_1.NearProtocalConfig),
});
function getContainer() {
    //@ts-ignore
    return !process.env.NEXT_RUNTIME && window.container
        ? //@ts-ignore
            window.container
        : exports.DefaultContainer;
}
exports.getContainer = getContainer;
