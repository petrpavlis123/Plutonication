import { AccessCredentials } from "../AccessCredentials";
export declare class PlutonicationModal extends HTMLElement {
    generateButton: HTMLElement;
    welcomeHeader: HTMLElement;
    qrCodeDiv: HTMLElement;
    scanQrContainer: HTMLElement;
    qrContainer: HTMLElement;
    scanText: HTMLElement;
    connectionInfoDiv: HTMLElement;
    disconnectBtn: HTMLElement;
    backToConnectBtn: HTMLElement;
    constructor();
    open(accessCredentials: AccessCredentials): void;
}
