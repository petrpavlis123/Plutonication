import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types";
import { AccessCredentials } from "./AccesCredentials";
declare class PlutonicationDAppClient {
    private accessCredentials;
    private socket;
    pubKey: string | null;
    private injector;
    constructor(accessCredentials: AccessCredentials);
    initialize(): void;
    receivePubKey(): void;
    sendJsonPayload(payloadJson: SignerPayloadJSON): void;
    sendRawPayload(raw: SignerPayloadRaw): void;
    private createInjector;
    transferExtrinsics(to: string, amount: number): Promise<void>;
    disconnect(): void;
    generateQR(accessCredentials: AccessCredentials): string;
}
export { PlutonicationDAppClient };
