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
var socket_io_client_1 = require("socket.io-client");
var keyring_1 = require("@polkadot/keyring");
var util_crypto_1 = require("@polkadot/util-crypto");
var util_1 = require("@polkadot/util");
var api_1 = require("@polkadot/api");
var PlutonicationWalletClient = /** @class */ (function () {
    function PlutonicationWalletClient(accessCredentials) {
        this.accessCredentials = accessCredentials;
        this.socket = null;
        this.roomKey = "";
        this.roomKey = accessCredentials.key;
        this.socket = (0, socket_io_client_1.io)(accessCredentials.url);
        // Create a keyring instance
        this.keyring = new keyring_1.Keyring({ type: "sr25519" });
        if (this.socket) {
            this.initializeSocketEvents();
            this.connectToServer();
        }
    }
    PlutonicationWalletClient.prototype.initializeSocketEvents = function () {
        var _this = this;
        if (this.socket) {
            this.socket.on("connect", function () {
                var _a;
                console.log("Connected to Plutonication Server");
                (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.emit("create_room", { Data: "Nothing", Room: _this.accessCredentials.key });
            });
            this.socket.on("message", function (data) {
                console.log("Received message:", data);
            });
            this.socket.on("pubkey", function (pubkey) {
                console.log("Wallet public key:", pubkey);
            });
            this.socket.on("payload_signature", function (data) {
                var signature = data.signature;
                console.log("Payload signature:", signature);
            });
            this.socket.on("payload_signature_rejected", function () {
            });
            this.socket.on("raw_signature", function (data) {
                var signature = data.signature;
                console.log("Raw signature:", signature);
            });
            this.socket.on("raw_signature_rejected", function () {
            });
        }
    };
    PlutonicationWalletClient.prototype.connectToServer = function () {
        if (this.socket) {
            this.socket.connect();
        }
    };
    PlutonicationWalletClient.prototype.sendAddress = function (address) {
        if (!this.socket)
            return;
        this.socket.emit("address", { address: address, Room: this.roomKey });
    };
    PlutonicationWalletClient.prototype.sendSignedPayloadAsync = function (payload) {
        if (this.socket) {
            this.socket.emit("sign_payload", {
                Data: payload,
                Room: this.roomKey,
            });
        }
    };
    PlutonicationWalletClient.prototype.sendSignedRawAsync = function (rawMessage) {
        if (this.socket) {
            this.socket.emit("sign_raw", {
                Data: rawMessage,
                Room: this.roomKey,
            });
        }
    };
    PlutonicationWalletClient.prototype.disconnect = function () {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    };
    PlutonicationWalletClient.prototype.createNewAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, api, blockNumber, genesisHash, mnemonic, account, ep, sp, message, signature, isValid, payloadJson, payloadRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new api_1.WsProvider("wss://ws.test.azero.dev");
                        return [4 /*yield*/, api_1.ApiPromise.create({ provider: provider })];
                    case 1:
                        api = _a.sent();
                        return [4 /*yield*/, api.rpc.chain.getBlockHash()];
                    case 2:
                        blockNumber = (_a.sent()).toHex();
                        genesisHash = api.genesisHash.toHex();
                        // const runtimeVersion = await api.rpc.state.getRuntimeVersion();
                        return [4 /*yield*/, (0, util_crypto_1.cryptoWaitReady)()];
                    case 3:
                        // const runtimeVersion = await api.rpc.state.getRuntimeVersion();
                        _a.sent();
                        mnemonic = (0, util_crypto_1.mnemonicGenerate)();
                        account = this.keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
                        console.log(this.keyring.pairs.length, "pairs available");
                        console.log(account.meta.name, "has address", account.address);
                        console.log("PubKey: ", account.publicKey);
                        ep = this.keyring.createFromUri(mnemonic, { name: "ed25519" }, "ed25519");
                        sp = this.keyring.createFromUri(mnemonic, { name: "sr25519" });
                        // log the addresses, different cryptos, different results
                        console.log(ep.meta.name, " : ", ep.address);
                        console.log(sp.meta.name, " : ", sp.address);
                        message = (0, util_1.stringToU8a)("this is our message");
                        signature = account.sign(message);
                        isValid = account.verify(message, signature, account.publicKey);
                        // output the result
                        console.log("".concat((0, util_1.u8aToHex)(signature), " is ").concat(isValid ? "valid" : "invalid"));
                        payloadJson = {
                            address: account.address,
                            blockHash: genesisHash,
                            blockNumber: blockNumber,
                            era: "0x00",
                            genesisHash: genesisHash,
                            method: "0x0000",
                            nonce: "0x0000",
                            specVersion: "0x0000",
                            tip: "0x00000000000000000000000000000000",
                            transactionVersion: "0x0000",
                            signedExtensions: [],
                            version: 1, // Falta obtenerlo a través de la api
                        };
                        payloadRaw = {
                            address: account.address,
                            type: "payload",
                            data: ""
                        };
                        // Emit the address to the DApp via socket event
                        this.sendAddress(account.address);
                        this.sendSignedPayloadAsync(payloadJson);
                        this.sendSignedRawAsync(payloadRaw);
                        return [2 /*return*/];
                }
            });
        });
    };
    return PlutonicationWalletClient;
}());
var credentials = {
    url: "wss://plutonication-acnha.ondigitalocean.app/",
    key: "1",
    ToUri: function () {
        throw new Error("Function not implemented.");
    }
};
var walletClient = new PlutonicationWalletClient(credentials);
void walletClient.createNewAccount();
