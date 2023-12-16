"use strict";
exports.__esModule = true;
// @packages
var socket_io_client_1 = require("socket.io-client");
var keyring_1 = require("@polkadot/keyring");
var PlutonicationWalletClient = /** @class */ (function () {
    function PlutonicationWalletClient(accessCredentials) {
        this.accessCredentials = accessCredentials;
        this.socket = null;
        this.roomKey = "";
        this.roomKey = accessCredentials.key;
        this.socket = socket_io_client_1.io(accessCredentials.url);
        this.keyring = new keyring_1.Keyring({ type: "sr25519" });
    }
    PlutonicationWalletClient.prototype.initialize = function () {
        var _this = this;
        var _a, _b, _c;
        void new Promise(function (resolve) {
            var _a;
            (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.on("connect", function () {
                console.log("Connected to Plutonication Server");
                resolve();
            });
        });
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on("message", function (data) {
            console.log("Received message:", data);
        });
        // Escuchar solicitud de firma desde la DApp
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on("sign_payload", function (payload) {
            console.log("Received sign payload request:", payload);
        });
        // Escuchar solicitud de firma desde la DApp
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.on("sign_raw", function (payload) {
            console.log("Received sign payload request:", payload);
        });
    };
    PlutonicationWalletClient.prototype.sendSignedPayload = function (payloadSignature) {
        if (this.socket) {
            this.socket.emit("payload_signature", {
                Data: payloadSignature,
                Room: this.roomKey
            });
        }
    };
    PlutonicationWalletClient.prototype.sendSignedRaw = function (rawMessage) {
        if (this.socket) {
            this.socket.emit("raw_signature", {
                Data: rawMessage,
                Room: this.roomKey
            });
        }
    };
    PlutonicationWalletClient.prototype.sendPublicKey = function (publicKey) {
        if (this.socket) {
            console.log("Sending public key: ", publicKey);
            this.socket.emit("pubkey", { Data: publicKey, Room: this.roomKey });
        }
    };
    PlutonicationWalletClient.prototype.disconnect = function () {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
        }
    };
    return PlutonicationWalletClient;
}());
exports.PlutonicationWalletClient = PlutonicationWalletClient;
