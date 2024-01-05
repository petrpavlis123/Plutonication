import { AccessCredentials } from '../AccessCredentials';
export declare class PlutonicationModal extends HTMLElement {
    private modal;
    private qrImage;
    constructor();
    openModal(accessCredentials: AccessCredentials): void;
    closeModal(): void;
}
