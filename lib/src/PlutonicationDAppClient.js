var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { io } from "socket.io-client";
export function initializePlutonicationDAppClient(accessCredentials, onReceivePubkey) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = io(accessCredentials.url);
        socket.on("message", (data) => {
            console.log("Plutonication received message:", data);
        });
        yield new Promise((resolve) => {
            socket.on("connect", () => {
                resolve();
            });
        });
        socket.emit("create_room", { Room: accessCredentials.key });
        const pubkey = yield new Promise((resolve) => {
            socket.on("pubkey", (receivedPubkey) => {
                onReceivePubkey(receivedPubkey);
                resolve(receivedPubkey);
            });
        });
        return {
            accounts: {
                get(_anyType) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return [{ address: pubkey }];
                    });
                },
                subscribe(_cb) {
                    return () => { };
                },
            },
            signer: {
                signPayload(payloadJson) {
                    return __awaiter(this, void 0, void 0, function* () {
                        socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
                        const signerResult = yield new Promise((resolve) => {
                            socket.on("payload_signature", (receivedPayloadSignature) => {
                                resolve(receivedPayloadSignature);
                            });
                        });
                        return signerResult;
                    });
                },
                signRaw(raw) {
                    return __awaiter(this, void 0, void 0, function* () {
                        socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
                        const signerResult = yield new Promise((resolve) => {
                            socket.on("raw_signature", (receivedPayloadSignature) => {
                                resolve(receivedPayloadSignature);
                            });
                        });
                        return signerResult;
                    });
                },
            },
            disconnect() {
                socket.emit("disconnect");
            }
        };
    });
}
export function initializePlutonicationDAppClientWithModal(accessCredentials, onReceivePubkey) {
    return __awaiter(this, void 0, void 0, function* () {
        const modal = getPlutonicationModal();
        modal.openModal(accessCredentials);
        return yield initializePlutonicationDAppClient(accessCredentials, (receivedPubkey) => {
            modal.closeModal();
            onReceivePubkey(receivedPubkey);
        });
    });
}
function getPlutonicationModal() {
    const plutonicationModals = document.getElementsByTagName('Plutonication-modal');
    if (plutonicationModals.length == 0) {
        throw new Error(`You have not included any Plutonication modal.
    Please include <Plutonication-modal></Plutonication-modal> in your HTML code.`);
    }
    if (plutonicationModals.length != 1) {
        console.warn(`You have included too many Plutonication modals.
      Please remove some of the <Plutonication-modal></Plutonication-modal>  in your HTML code to improve performance.
      \n
      In rare cases, this may cause the modal to not appear as you want to.
    `);
    }
    return plutonicationModals[0];
}
//# sourceMappingURL=PlutonicationDAppClient.js.map