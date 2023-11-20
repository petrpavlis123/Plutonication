"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/quotes
var react_1 = __importDefault(require("react"));
var Welcome_1 = __importDefault(require("./Welcome"));
var App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Welcome_1.default, null)));
};
exports.default = App;
