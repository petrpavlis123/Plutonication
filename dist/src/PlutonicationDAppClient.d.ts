import type { Injected } from "@polkadot/extension-inject/types";
import { Transaction } from "./interfaces/transaction.interface";
import { AccessCredentials } from "./AccesCredentials";
declare class PlutonicationDAppClient {
    private static socket;
    private static pubKey;
    private static signature;
    private static qrUri;
    static InitializeAsync(accessCredentials: AccessCredentials, callback: (pubkey: string) => void): Promise<Injected>;
    static SendPayloadAsync(accessCredentials: AccessCredentials, transactionDetails: Transaction): Promise<void>;
    static generateQR(accessCredentials: AccessCredentials): string;
}
export { PlutonicationDAppClient };
