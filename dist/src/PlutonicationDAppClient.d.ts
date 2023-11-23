import type { Injected } from "@polkadot/extension-inject/types";
import { Transaction } from "./interfaces/transaction.interface";
import { AccessCredentials } from "./AccesCredentials";
declare class PlutonicationDAppClient {
    private socket;
    pubKey: string | null;
    private signature;
    private injector;
    constructor();
    initializeAsync(accessCredentials: AccessCredentials): Promise<Injected>;
    private createInjected;
    sendPayloadAsync(transactionDetails: Transaction): Promise<void>;
    generateQR(accessCredentials: AccessCredentials): string;
}
export { PlutonicationDAppClient };
