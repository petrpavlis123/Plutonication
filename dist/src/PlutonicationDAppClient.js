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
exports.PlutonicationDAppClient = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// @packages
var api_1 = require("@polkadot/api");
var socket_io_client_1 = require("socket.io-client");
var waitForSignature_1 = require("./helpers.ts/waitForSignature");
// interface InjectedAccount {
//   address: string;
// }
// interface Injected {
//   accounts: {
//     get(_anyType?: boolean): Promise<InjectedAccount[]>;
//     subscribe(_cb: (accounts: InjectedAccount[]) => void | Promise<void>): () => void;
//   };
//   signer: {
//     signPayload(payloadJson: SignerPayloadJSON): Promise<SignerResult>;
//     signRaw(raw: SignerPayloadRaw): Promise<SignerResult>;
//   };
// }
// interface SignerPayloadJSON {}
// interface SignerPayloadRaw {}
// interface SignerResult {
//   id: number;
//   signature: string;
// }
// interface Transaction {
//   to: string;
//   amount: number;
// }
var PlutonicationDAppClient = /** @class */ (function () {
    function PlutonicationDAppClient() {
        this.socket = null;
        this.pubKey = null;
        this.signature = null;
        this.injector = undefined;
    }
    PlutonicationDAppClient.prototype.initializeAsync = function (accessCredentials) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.socket = (0, socket_io_client_1.io)(accessCredentials.url);
                        this.socket.on("connect", function () {
                            console.log("Connected!");
                            _this.socket.emit("create_room", { Data: "Nothing", Room: accessCredentials.key });
                        });
                        this.socket.on("message", function (data) {
                            console.log("Received message:", data);
                        });
                        _a = this;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.socket.on("pubkey", function (pubkey) {
                                    console.log("Received pubkey:", pubkey);
                                    resolve(pubkey);
                                });
                                _this.socket.on("connect_error", function (error) {
                                    reject(new Error("Connection error: ".concat(error.message)));
                                });
                            })];
                    case 1:
                        _a.pubKey = _b.sent();
                        this.injector = this.createInjected(this.pubKey || "", this.socket, accessCredentials);
                        return [2 /*return*/, this.injector];
                    case 2:
                        error_1 = _b.sent();
                        console.error("Error during initialization:", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlutonicationDAppClient.prototype.createInjected = function (pubKey, socket, accessCredentials) {
        return {
            accounts: {
                // eslint-disable-next-line @typescript-eslint/require-await
                get: function (_anyType) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, [{ address: pubKey }]];
                        });
                    });
                },
                subscribe: function (_cb) {
                    return function () { };
                },
            },
            signer: {
                signPayload: function (payloadJson) {
                    return __awaiter(this, void 0, void 0, function () {
                        var signature;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // requesting signature from wallet
                                    socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
                                    return [4 /*yield*/, (0, waitForSignature_1.waitForSignature)()];
                                case 1:
                                    signature = _a.sent();
                                    return [2 /*return*/, { id: 0, signature: signature }];
                            }
                        });
                    });
                },
                signRaw: function (raw) {
                    return __awaiter(this, void 0, void 0, function () {
                        var signature;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // requesting signature from wallet
                                    socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
                                    return [4 /*yield*/, (0, waitForSignature_1.waitForSignature)()];
                                case 1:
                                    signature = _a.sent();
                                    return [2 /*return*/, { id: 0, signature: signature }];
                            }
                        });
                    });
                },
            },
        };
    };
    PlutonicationDAppClient.prototype.sendPayloadAsync = function (transactionDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, api, signer, sender, transferExtrinsic, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.injector || !this.pubKey) {
                            throw new Error("Please call initializeAsync first.");
                        }
                        provider = new api_1.WsProvider("wss://ws.test.azero.dev");
                        return [4 /*yield*/, api_1.ApiPromise.create({ provider: provider })];
                    case 1:
                        api = _a.sent();
                        signer = this.injector.signer;
                        sender = this.pubKey;
                        transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);
                        // const statusCallback = ({ status }: { status: unknown }): void => {
                        //   if (status.isInBlock) {
                        //     console.log(`Completed at block hash #${status.asInBlock.toString()}`);
                        //   } else {
                        //     console.log(`Current status: ${status.type}`);
                        //   }
                        // };
                        // await transferExtrinsic.signAndSend(sender, { signer }, statusCallback);
                        return [4 /*yield*/, transferExtrinsic.signAndSend(sender, { signer: signer }, function (_a) {
                                var status = _a.status;
                                if (status.isInBlock) {
                                    console.log("Completed at block hash #".concat(status.asInBlock.toString()));
                                }
                                else {
                                    console.log("Current status: ".concat(status.type));
                                }
                            }).catch(function (error) {
                                console.log(":( transaction failed", error);
                            })];
                    case 2:
                        // const statusCallback = ({ status }: { status: unknown }): void => {
                        //   if (status.isInBlock) {
                        //     console.log(`Completed at block hash #${status.asInBlock.toString()}`);
                        //   } else {
                        //     console.log(`Current status: ${status.type}`);
                        //   }
                        // };
                        // await transferExtrinsic.signAndSend(sender, { signer }, statusCallback);
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error during payload sending:", error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlutonicationDAppClient.prototype.generateQR = function (accessCredentials) {
        var uriQr = accessCredentials.ToUri();
        return uriQr;
    };
    return PlutonicationDAppClient;
}());
exports.PlutonicationDAppClient = PlutonicationDAppClient;
// const accessCredentials = new AccessCredentials(
//   "wss://plutonication-acnha.ondigitalocean.app/",
//   "1",
//   "Galaxy Logic Game",
//   "https://rostislavlitovkin.pythonanywhere.com/logo"
// );
// const transactionDetails: Transaction = {
//   to: "5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ",
//   amount: 1000 * 10 ** 12,
// };
// void (async (): Promise<void> => {
//   const dappClient = new PlutonicationDAppClient();
//   console.log("instanciando mi dapp");
//   try {
//     const injected: Injected = await dappClient.initializeAsync(accessCredentials);
//     console.log("Injected:", injected);
//     await dappClient.sendPayloadAsync(transactionDetails);
//   } catch (error) {
//     console.error("Error in main flow:", error);
//   }
// })();
