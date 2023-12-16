declare class KeyringManager {
    private keyring;
    constructor();
    generateNewPair(): Promise<{
        pubKeySS58Format: string;
        signature: string;
    }>;
}
export { KeyringManager };
