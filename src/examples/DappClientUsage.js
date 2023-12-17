"use strict";
// Small example of how to send the payloads request to be signed  to the  
//wallet using PlutonicationDappClient function
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
var AccesCredentials_1 = require("../AccesCredentials");
var PlutonicationDAppClient_1 = require("../PlutonicationDAppClient");
var dappClientUsage = function () { return __awaiter(void 0, void 0, void 0, function () {
    var accessCredentials, dappClient, payloadRaw, payloadJson, pubKey, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessCredentials = new AccesCredentials_1.AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/", "1", "Galaxy Logic Game", "https://rostislavlitovkin.pythonanywhere.com/logo");
                dappClient = new PlutonicationDAppClient_1.PlutonicationDAppClient(accessCredentials);
                payloadRaw = {
                    address: "5EenBDznmizmHFXu37jGsQ3K7uvcrAqXjKByoqgbge82KMgF",
                    data: "0x3c42797465733e48656c6c6f20537562737472617465206d6573736167653c2f42797465733e",
                    type: "bytes"
                };
                payloadJson = {
                    address: "5EenBDznmizmHFXu37jGsQ3K7uvcrAqXjKByoqgbge82KMgF",
                    blockHash: "0xd12ff783a76a5e07156d2a3ff61745b3a1f892bf6247c1b3bf0fd7ba2085eda6",
                    blockNumber: "0x02c539c4",
                    era: "0x481c",
                    genesisHash: "0x05d5279c52c484cc80396535a316add7d47b1c5b9e0398dd1f584149341460c5",
                    method: "0x050700004769bbe59968882c1597ec1151621f0193547285125f1c1337371c013ff61f0f0080c6a47e8d03",
                    nonce: "0x00000001",
                    signedExtensions: ["CheckNonZeroSender", "CheckSpecVersion", "CheckTxVersion", "CheckGenesis", "CheckMortality", "CheckNonce", "CheckWeight", "ChargeTransactionPayment"],
                    specVersion: "0x00000043",
                    tip: "0x00000000000000000000000000000000",
                    transactionVersion: "0x00000011",
                    version: 4
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                // Llama a cada función secuencialmente usando async/await
                return [4 /*yield*/, dappClient.initializeAsync()];
            case 2:
                // Llama a cada función secuencialmente usando async/await
                _a.sent();
                return [4 /*yield*/, dappClient.receivePubKeyAsync()];
            case 3:
                pubKey = _a.sent();
                // Ahora puedes usar la pubKey
                console.log("La pubKey es:", pubKey);
                return [4 /*yield*/, dappClient.sendJsonPayloadAsync(payloadJson)];
            case 4:
                _a.sent();
                return [4 /*yield*/, dappClient.sendRawPayloadAsync(payloadRaw)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error:", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
dappClientUsage();
