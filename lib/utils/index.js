"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSONData = void 0;
exports.parseJSONData = function (data) {
    var parsedData = undefined;
    try {
        parsedData = JSON.parse(data);
    }
    catch (e) { }
    return parsedData;
};
