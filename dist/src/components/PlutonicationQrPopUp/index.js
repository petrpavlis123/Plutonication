"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
// @packages
var react_1 = __importStar(require("react"));
var qrcode_react_1 = require("qrcode.react");
// @scripts
var AccesCredentials_1 = require("../../AccesCredentials");
var PlutonicationDAppClient_1 = require("../../PlutonicationDAppClient");
var testing_image_png_1 = __importDefault(require("../../../assets/images/testing-image.png"));
var Arrow_Back_svg_1 = __importDefault(require("../../../assets/svg/Arrow Back.svg"));
// @styles
require("./Welcome.css");
var PlutonicationQrPopUp = function () {
    var _a = react_1.useState(""), qrCodeImage = _a[0], setQRCodeImage = _a[1];
    var _b = react_1.useState(false), isWalletConnected = _b[0], setIsWalletConnected = _b[1];
    var _c = react_1.useState(""), pubKey = _c[0], setPubkey = _c[1];
    var overlayRef = react_1.useRef(null);
    var accessCredentials = new AccesCredentials_1.AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/", "1", "Galaxy Logic Game", "https://rostislavlitovkin.pythonanywhere.com/logo");
    var dappClient = new PlutonicationDAppClient_1.PlutonicationDAppClient();
    var initializeDapp = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setQRCodeImage(dappClient.generateQR(accessCredentials));
                    return [4 /*yield*/, dappClient.initializeAsync(accessCredentials)];
                case 1:
                    _a.sent();
                    setIsWalletConnected(true);
                    setPubkey(dappClient.pubKey || "");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error initializing the app:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (pubKey !== "") {
            setQRCodeImage("");
        }
    }, [pubKey]);
    var disconnect = function () {
        // disconnect functionality here
        console.log("Disconnecting!");
        setIsWalletConnected(false);
        closeQR();
    };
    var closeQR = function () {
        setQRCodeImage("");
    };
    var handleOverlayClick = function (e) {
        if (overlayRef.current === e.target) {
            closeQR();
        }
    };
    console.log("qrCodeImage", qrCodeImage);
    return (react_1.default.createElement("div", { className: "welcome__container " + (qrCodeImage ? "overlay" : ""), ref: overlayRef, onClick: function (e) { return handleOverlayClick(e); } },
        react_1.default.createElement("main", null, qrCodeImage ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "welcome__QR-text-container" },
                react_1.default.createElement("p", { className: "welcome__QR-text" }, "Plutonication Connect")),
            react_1.default.createElement("img", { className: "welcome__QR-back-arrow", alt: "close", onClick: closeQR, src: Arrow_Back_svg_1.default, width: 25, height: 25 }),
            react_1.default.createElement("div", { className: "welcome__QR-container" },
                react_1.default.createElement(qrcode_react_1.QRCodeCanvas, { size: 250, className: "welcome__QR", value: qrCodeImage, imageSettings: {
                        src: "" + testing_image_png_1.default,
                        x: undefined,
                        y: undefined,
                        height: 30,
                        width: 30,
                        excavate: true,
                    }, bgColor: "#FFFFFF", level: "H" })),
            react_1.default.createElement("div", { className: "welcome__QR-text-button-container" },
                react_1.default.createElement("p", { className: "welcome__QR-text" }, "Scan this QR with your phone")))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h4", { className: "welcome__QR-headaer" }, "Welcome to Plutonication"),
            react_1.default.createElement("div", { className: "welcome__btn-container" },
                react_1.default.createElement("button", { className: "welcome__btn", onClick: function () { return isWalletConnected ? disconnect() : initializeDapp(); } }, isWalletConnected ? "Disconnect" : "Connect")),
            isWalletConnected && react_1.default.createElement("p", { className: "welcome__QR-text-connected" },
                "Connected to ",
                pubKey,
                " "))))));
};
exports.default = PlutonicationQrPopUp;
