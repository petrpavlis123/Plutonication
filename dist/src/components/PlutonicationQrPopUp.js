"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutonicationQrPopUp = void 0;
var PlutonicationDAppClient_1 = require("../PlutonicationDAppClient");
var PlutonicationQrPopUp = /** @class */ (function (_super) {
    __extends(PlutonicationQrPopUp, _super);
    function PlutonicationQrPopUp() {
        var _this = _super.call(this) || this;
        _this.qrCodeImage = "";
        _this.isWalletConnected = false;
        _this.pubKey = "";
        _this.overlayRef = null;
        _this.accessCredentials = {
            url: "wss://plutonication-acnha.ondigitalocean.app/",
            key: "1",
            name: "Galaxy Logic Game",
            icon: "https://rostislavlitovkin.pythonanywhere.com/logo",
            ToUri: function () {
                throw new Error("Function not implemented.");
            }
        };
        _this.dappClient = new PlutonicationDAppClient_1.PlutonicationDAppClient();
        _this.initializeDapp = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.qrCodeImage = this.dappClient.generateQR(this.accessCredentials);
                        return [4 /*yield*/, this.dappClient.initializeAsync(this.accessCredentials)];
                    case 1:
                        _a.sent();
                        this.isWalletConnected = true;
                        this.pubKey = this.dappClient.pubKey || "";
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error initializing the app:", error_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.render();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.disconnect = function () {
            _this.isWalletConnected = false;
            _this.closeQR();
        };
        _this.closeQR = function () {
            _this.qrCodeImage = "";
            _this.render();
        };
        _this.handleOverlayClick = function (e) {
            if (_this.overlayRef === e.target) {
                _this.closeQR();
            }
        };
        _this.attachShadow({ mode: "open" });
        return _this;
    }
    PlutonicationQrPopUp.prototype.connectedCallback = function () {
        var _a;
        this.overlayRef = document.createElement("div");
        this.overlayRef.classList.add("welcome__container");
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.overlayRef);
        this.render();
    };
    PlutonicationQrPopUp.prototype.render = function () {
        var _a = this, qrCodeImage = _a.qrCodeImage, isWalletConnected = _a.isWalletConnected, pubKey = _a.pubKey;
        if (this.overlayRef) {
            this.overlayRef.innerHTML = "\n        <main>\n          ".concat(qrCodeImage ? "\n            <!-- C\u00F3digo para mostrar el c\u00F3digo QR -->\n            <p>QR Code: ".concat(qrCodeImage, "</p>\n          ") : "\n            <!-- C\u00F3digo cuando no hay imagen de QR -->\n            <h4>Welcome to Plutonication</h4>\n            <button onclick=\"this.isWalletConnected ? this.disconnect() : this.initializeDapp()\">\n              ".concat(isWalletConnected ? "Disconnect" : "Connect", "\n            </button>\n            ").concat(isWalletConnected ? "<p>Connected to ".concat(pubKey, "</p>") : "", "\n          "), "\n        </main>\n      ");
            this.overlayRef.onclick = this.handleOverlayClick;
        }
    };
    return PlutonicationQrPopUp;
}(HTMLElement));
exports.PlutonicationQrPopUp = PlutonicationQrPopUp;
customElements.define("plutonication-qr-popup", PlutonicationQrPopUp);
