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
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-vars */
// @packages
var api_1 = require("@polkadot/api");
var socket_io_client_1 = require("socket.io-client");
var AccesCredentials_1 = require("./AccesCredentials");
var waitForSignature_1 = require("./helpers.ts/waitForSignature");
var PlutonicationDAppClient = /** @class */ (function () {
    function PlutonicationDAppClient() {
    }
    PlutonicationDAppClient.InitializeAsync = function (accessCredentials, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.socket = socket_io_client_1.io(accessCredentials.url);
                        _this.socket.on("connect", function () {
                            console.log("Connected!");
                            _this.socket.emit("create_room", { Data: "Nothing", Room: accessCredentials.key });
                        });
                        _this.socket.on("message", function (data) {
                            console.log("Received message:", data);
                        });
                        _this.socket.on("pubkey", function (pubkey) {
                            _this.pubKey = pubkey;
                            callback(pubkey);
                            var injected = {
                                accounts: {
                                    // eslint-disable-next-line @typescript-eslint/require-await
                                    get: function (_anyType) { return __awaiter(_this, void 0, void 0, function () {
                                        var account;
                                        return __generator(this, function (_a) {
                                            account = {
                                                address: this.pubKey
                                            };
                                            return [2 /*return*/, [account]];
                                        });
                                    }); },
                                    subscribe: function (_cb) {
                                        return function () { };
                                    }
                                },
                                signer: {
                                    signPayload: function (payloadJson) { return __awaiter(_this, void 0, void 0, function () {
                                        var result, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    // requesting signature from wallet
                                                    this.socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
                                                    _a = {
                                                        /**
                                                         * @description The id for this request
                                                         */
                                                        id: 0
                                                    };
                                                    return [4 /*yield*/, waitForSignature_1.waitForSignature()];
                                                case 1:
                                                    result = (
                                                    /**
                                                     * @description The resulting signature in hex
                                                     */
                                                    _a.signature = _b.sent(),
                                                        _a);
                                                    return [2 /*return*/, result];
                                            }
                                        });
                                    }); },
                                    signRaw: function (raw) { return __awaiter(_this, void 0, void 0, function () {
                                        var result, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    // requesting signature from wallet
                                                    this.socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
                                                    _a = {
                                                        /**
                                                         * @description The id for this request
                                                         */
                                                        id: 0
                                                    };
                                                    return [4 /*yield*/, waitForSignature_1.waitForSignature()];
                                                case 1:
                                                    result = (
                                                    /**
                                                     * @description The resulting signature in hex
                                                     */
                                                    _a.signature = _b.sent(),
                                                        _a);
                                                    return [2 /*return*/, result];
                                            }
                                        });
                                    }); }
                                }
                            };
                            _this.injector = injected;
                            _this.socket.on("payload_signature", function (data) {
                                console.log("signed_payload: ", data);
                                _this.signature = data.signature;
                            });
                            _this.socket.on("payload_signature_rejected", function (errorData) {
                                console.error("Signature rejected:", errorData);
                            });
                            _this.socket.on("raw_signature", function (signature) {
                                console.log("signed_raw: ", signature);
                            });
                            _this.socket.on("raw_signature_rejected", function (errorData) {
                                console.error("Signature rejected:", errorData);
                            });
                            resolve(injected);
                        });
                    })];
            });
        });
    };
    PlutonicationDAppClient.SendPayloadAsync = function (transactionDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, api, signer, sender, transferExtrinsic, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.injector) {
                            throw new Error("Please call InitializeAsync first.");
                        }
                        if (!this.pubKey) {
                            throw new Error("pubKey is not available.");
                        }
                        provider = new api_1.WsProvider("wss://ws.test.azero.dev");
                        return [4 /*yield*/, api_1.ApiPromise.create({ provider: provider })];
                    case 1:
                        api = _a.sent();
                        signer = this.injector.signer;
                        sender = this.pubKey;
                        transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);
                        transferExtrinsic.signAndSend(sender, { signer: signer }, function (_a) {
                            var status = _a.status;
                            if (status.isInBlock) {
                                console.log("Completed at block hash #" + status.asInBlock.toString());
                            }
                            else {
                                console.log("Current status: " + status.type);
                            }
                        })["catch"](function (error) {
                            console.log(":( transaction failed", error);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error:", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlutonicationDAppClient.generateQR = function (accessCredentials) {
        var uriQr = accessCredentials.ToUri();
        return uriQr;
    };
    return PlutonicationDAppClient;
}());
exports.PlutonicationDAppClient = PlutonicationDAppClient;
var accessCredentials = new AccesCredentials_1.AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/", "1", "Galaxy Logic Game", "https://rostislavlitovkin.pythonanywhere.com/logo");
var transactionDetails = {
    to: "5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ",
    amount: 1000 * Math.pow(10, 12)
};
void PlutonicationDAppClient.InitializeAsync(accessCredentials, function (pubKey) {
    console.log("PubKey received: " + pubKey);
}).then(function (injected) {
    console.log("injected", injected);
    void PlutonicationDAppClient.SendPayloadAsync(transactionDetails);
})["catch"](function (error) {
    console.error("Error during initialization:", error);
});
