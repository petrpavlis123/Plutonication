"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
// @scripts
var AccesCredentials_1 = require("./AccesCredentials");
var PlutonicationDAppClient = /** @class */ (function () {
    function PlutonicationDAppClient(accessCredentials) {
        this.accessCredentials = accessCredentials;
        this.pubKey = null;
        this.socket = socket_io_client_1.io(this.accessCredentials.url);
    }
    PlutonicationDAppClient.prototype.initialize = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on("connect", function () {
            var _a;
            console.log("Connected!");
            (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.emit("create_room", { Data: "Nothing", Room: _this.accessCredentials.key });
        });
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on("message", function (data) {
            console.log("Received message:", data);
        });
        // Listen for payload signature from wallet
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.on("payload_signature", function (signature) {
            console.log("Received payload signature:", signature);
        });
        // Listen for raw signature from wallet
        (_d = this.socket) === null || _d === void 0 ? void 0 : _d.on("raw_signature", function (signature) {
            console.log("Received raw signature:", signature);
        });
    };
    PlutonicationDAppClient.prototype.receivePubKey = function () {
        var _this = this;
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on("pubkey", function (pubkey) {
            console.log("Received pubkey:", pubkey);
            _this.pubKey = pubkey;
        });
    };
    // public async receivePubKey(): Promise<void> {
    //   try {
    //     this.pubKey = await new Promise<string>((resolve, reject) => {
    //       this.socket?.on("pubkey", (pubkey: string) => {
    //         console.log("Received pubkey:", pubkey);
    //         resolve(pubkey);
    //       });
    //       this.socket?.on("connect_error", (error: Error) => {
    //         reject(new Error(`Connection error: ${error.message}`));
    //       });
    //     });
    //   } catch (error) {
    //     console.error("Error during initialization:", error);
    //     throw error;
    //   }
    // }
    PlutonicationDAppClient.prototype.sendJsonPayload = function (payloadJson) {
        if (this.socket) {
            this.socket.emit("sign_payload", { Data: payloadJson, Room: this.accessCredentials.key });
        }
    };
    PlutonicationDAppClient.prototype.sendRawPayload = function (raw) {
        if (this.socket) {
            this.socket.emit("sign_raw", { Data: raw, Room: this.accessCredentials.key });
        }
    };
    // public sendPayloads(): Injected {
    //   try {
    //     this.injector = this.sendPayloadAsync(this.pubKey || "", this.socket, this.accessCredentials);
    //     return this.injector;
    //   } catch (error) {
    //     console.error("Error during initialization:", error);
    //     throw error;
    //   }
    // }
    // private sendPayloadAsync(pubKey: string, socket: Socket, accessCredentials: AccessCredentials): Injected {
    //   return {
    //     accounts: {
    //       // eslint-disable-next-line @typescript-eslint/require-await
    //       async get(_anyType?: boolean): Promise<InjectedAccount[]> {
    //         return [{ address: pubKey }];
    //       },
    //       subscribe(_cb: (accounts: InjectedAccount[]) => void | Promise<void>): () => void {
    //         return () => {};
    //       },
    //     },
    //     signer: {
    //       async signPayload(payloadJson: SignerPayloadJSON): Promise<SignerResult> {
    //         // requesting signature from wallet
    //         socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
    //         const signature = await waitForSignature();
    //         return { id: 0, signature };
    //       },
    //       async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
    //         // requesting signature from wallet
    //         socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
    //         const signature = await waitForSignature();
    //         return { id: 0, signature };
    //       },
    //     },
    //   };
    // }
    // async transferExtrinsics(to: string, amount: number): Promise<void> {
    //   try {
    //     if (!this.injector || !this.pubKey) {
    //       throw new Error("Please call initializeAsync first.");
    //     }
    //     const provider = new WsProvider("wss://ws.test.azero.dev");
    //     const api = await ApiPromise.create({ provider });
    //     const signer = this.injector.signer;
    //     const sender = this.pubKey;
    //     const transferExtrinsic = api.tx.balances.transfer(to, amount);
    //     await transferExtrinsic.signAndSend(sender, { signer: signer }, ({ status }) => {
    //       if (status.isInBlock) {
    //         console.log(`Completed at block hash #${status.asInBlock.toString()}`);
    //       } else {
    //         console.log(`Current status: ${status.type}`);
    //       }
    //     }).catch((error: unknown) => {
    //       console.log(":( transaction failed", error);
    //     });
    //   } catch (error) {
    //     console.error("Error during payload sending:", error);
    //     throw error;
    //   }
    // }
    PlutonicationDAppClient.prototype.disconnect = function () {
        if (this.socket) {
            this.socket.disconnect();
        }
    };
    PlutonicationDAppClient.prototype.generateQR = function (accessCredentials) {
        var uriQr = accessCredentials.ToUri();
        return uriQr;
    };
    return PlutonicationDAppClient;
}());
exports.PlutonicationDAppClient = PlutonicationDAppClient;
var accessCredentials = new AccesCredentials_1.AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/", "1", "Galaxy Logic Game", "https://rostislavlitovkin.pythonanywhere.com/logo");
var payload = {
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
var rawMessage = {
    address: "5EenBDznmizmHFXu37jGsQ3K7uvcrAqXjKByoqgbge82KMgF",
    data: "0x3c42797465733e48656c6c6f20537562737472617465206d6573736167653c2f42797465733e",
    type: "bytes"
};
var dappClient = new PlutonicationDAppClient(accessCredentials);
// Iniciar la conexión e inicialización asincrónica
void (function () {
    try {
        // Inicializar la conexión y obtener la inyección de la extensión
        dappClient.initialize();
        dappClient.receivePubKey();
        dappClient.sendJsonPayload(payload);
        dappClient.sendRawPayload(rawMessage);
    }
    catch (error) {
        console.error("Error:", error);
    }
})();
