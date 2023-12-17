import { AccessCredentials } from "./AccessCredentials";
declare class PlutonicationWalletClient {
    private accessCredentials;
    private socket;
    private roomKey;
    private keyring;
    constructor(accessCredentials: AccessCredentials);
    initialize(): void;
    sendSignedPayload(payloadSignature: string): void;
    sendSignedRaw(rawMessage: string): void;
    sendPublicKey(publicKey: string): void;
    disconnect(): void;
}
export { PlutonicationWalletClient };
