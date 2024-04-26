import QRCode from 'qrcode';
import { AccessCredentials } from '../AccessCredentials';
import  { DOMAttributes }  from 'react';

/**
 * "QR Modal used to connect the dapp to the Plutonication server.
 * @extends HTMLElement
 */

const template = require('../../testing.html');
// require('./plutonication-modal.scss');
export class PlutonicationModal extends HTMLElement {
  private modal: HTMLElement;
  private qrImage: HTMLImageElement;
  private plusButton: HTMLElement;

  // private originalWalletsContent: string;
  private additionalWallets: NodeListOf<HTMLElement>;

  /**
 * Constructor.
 * Creates a new modal and sets up its elements.
 */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = template.default;
  }

  connectedCallback() {
    const accessCredentials = new AccessCredentials(
        "wss://plutonication-acnha.ondigitalocean.app/",
        "Plutonication test",
        "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
    );

    this.generateQRCode(accessCredentials.ToUri());
    this.plusButton = this.shadowRoot.getElementById('showMoreWallets');
    console.log("this.plusButton",this.plusButton);
    this.plusButton.addEventListener('click', () => {
      console.log("MOSTRANDO WALLETS");
      this.showMoreWallets();
    });
  }

  // Function to generate the QR code with the accesCredentials
  async generateQRCode(inputText: string) {
    // const inputText = 'plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1710194226878&name=Plutonication%20test&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Fplutowalleticonwhite'; 
    console.log("Generating QR Code");
    const qrCodeContainer = this.shadowRoot.getElementById('qr-code');

    try {
        const qrCodeDataURL = await QRCode.toDataURL(inputText);
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = qrCodeDataURL;
        console.log("qrCodeContainer", qrCodeContainer);
        if (qrCodeContainer) {
            qrCodeContainer.innerHTML = '';
            qrCodeContainer.appendChild(qrCodeImage);
        }
    } catch (error) {
        console.error('Something went wrong generating the QR code:', error);
    }
}

showMoreWallets() {
  this.plusButton.style.display = 'none';
  const moreWalletsItem = this.shadowRoot.querySelectorAll('.plutonication__wallets-item-hidden');
  moreWalletsItem.forEach(wallet => {
    wallet.classList.remove('plutonication__wallets-item-hidden');
});
}

// Function to show more wallets if there exists more than four

  /**
   * Opens the modal and displays the QR code generated with the access credentials information.
   * @param {AccessCredentials} accessCredentials - Acces cedentials to generate the QR.
   */
  openModal(accessCredentials: AccessCredentials): void {
    const qrData = accessCredentials.ToUri();
    this.additionalWallets = document.querySelectorAll('.plutonication__wallets-content div:nth-child(n+5)');
    console.log("additionalWallets", this.additionalWallets);
    this.additionalWallets.forEach(wallet => {
      wallet.style.display = 'none';
    });
    try {
      QRCode.toDataURL(qrData, { width: 250 })
        .then(url => {
          this.qrImage.src = url;
          this.qrImage.style.display = 'block';
          this.modal.style.display = 'flex';
        })
        .catch(error => {
          console.error('Error generating QR code:', error);
        });
    
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }


hideQRCode() {
  const qrCodeContainer = document.getElementById('qr-code');
  if (qrCodeContainer) {
      qrCodeContainer.style.display = 'none';
  }
}

  /**
   * Closes the modal along with the QR code.
   */
  closeModal(): void {
    this.modal.style.display = 'none';
    this.qrImage.style.display = 'none';
  }
  
}

// Defines the html web component
customElements.define('plutonication-modal', PlutonicationModal);

// Extend the JSX namespace
type CustomElement<T> = Partial<T & DOMAttributes<T>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['plutonication-modal']: CustomElement<PlutonicationModal>;
    }
  }
}
