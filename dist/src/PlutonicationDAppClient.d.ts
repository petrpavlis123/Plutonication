import type { Injected } from "@polkadot/extension-inject/types";
import { Transaction } from "./interfaces/transaction.interface";
import { AccessCredentials } from "./AccesCredentials";
declare class PlutonicationDAppClient {
    private static socket;
    static pubKey: string;
    private static signature;
    private static injector;
    static InitializeAsync(accessCredentials: AccessCredentials, callback: (pubkey: string) => void): Promise<Injected>;
    static SendPayloadAsync(transactionDetails: Transaction): Promise<void>;
    static generateQR(accessCredentials: AccessCredentials): string;
}
export { PlutonicationDAppClient };
