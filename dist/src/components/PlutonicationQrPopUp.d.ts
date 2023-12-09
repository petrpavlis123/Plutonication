import { AccessCredentials } from "../AccesCredentials";
import { PlutonicationDAppClient } from "../PlutonicationDAppClient";
declare class PlutonicationQrPopUp extends HTMLElement {
    qrCodeImage: string;
    isWalletConnected: boolean;
    pubKey: string;
    overlayRef: HTMLDivElement | null;
    accessCredentials: AccessCredentials;
    dappClient: PlutonicationDAppClient;
    constructor();
    connectedCallback(): void;
    initializeDapp: () => Promise<void>;
    disconnect: () => void;
    closeQR: () => void;
    handleOverlayClick: (e: MouseEvent) => void;
    render(): void;
}
export { PlutonicationQrPopUp };
