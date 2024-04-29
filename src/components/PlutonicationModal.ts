import QRCode from 'qrcode';
import { AccessCredentials } from '../AccessCredentials';
import  { DOMAttributes }  from 'react';
import { cssStyles, htmlTemplate } from './PlutonicationContent';

/**
 * "QR Modal used to connect the dapp to the Plutonication server.
 * @extends HTMLElement
 */

const template = htmlTemplate;
const styles = cssStyles;

const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "Plutonication test",
  "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
)
export class PlutonicationModal extends HTMLElement {
  private modal: HTMLElement;
  private plusButton: HTMLElement;
  private closeBtn: HTMLElement;
  private backBtn: HTMLElement;
  private isNpmPackage: boolean;
  private initialContent: string;
  private initialStyles: string;


  /**
 * Constructor.
 * Creates a new modal and sets up its elements.
 */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    // shadow.innerHTML = template.default;
    shadow.innerHTML = template;

    const style = document.createElement('style');
    style.textContent = styles;
    shadow.appendChild(style);

    this.initialContent = template;
    this.initialStyles = styles;

  }

  connectedCallback() {
    
    // Initializing some elements
    this.modal = this.shadowRoot.querySelector('.plutonication__component') as HTMLElement;
    // this.initialView = this.shadowRoot.querySelector('.plutonication__component') as HTMLElement;
    console.log("this.modal.style.display", this.modal.style.display);
    this.closeBtn = this.shadowRoot.querySelector('.close') as HTMLElement;
    this.backBtn = this.shadowRoot.querySelector('.back') as HTMLElement;

    //  Showing more wallets when clic the plus btn
    this.plusButton = this.shadowRoot.getElementById('showMoreWallets');
    this.plusButton.addEventListener('click', () => {
      this.showMoreWallets();
    });

    // Showing wallet info to download it.
    const walletItems = this.shadowRoot.querySelectorAll('.plutonication__wallets-item');
    walletItems.forEach(walletItem => {
      walletItem.addEventListener('click', () => {
          this.showWalletDownloadButtons(walletItem);
      });
    });

    // Close modal clicking the btn
    // const closeButton = this.shadowRoot.querySelector('.close');
    this.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    this.backBtn.addEventListener('click', () => {
      this.backToInitialView();
    });
  }

  backToInitialView() {
    // plutonication__component-override-styles 
    this.shadowRoot.innerHTML = this.initialContent;

    if (!this.isNpmPackage) {
      const elementsToOverride = this.shadowRoot.querySelectorAll('.plutonication__component');
      elementsToOverride.forEach(element => {
          element.classList.add('plutonication__component-override-styles');
      });
    }

    // Restaurar los estilos originales
    const style = document.createElement('style');
    style.textContent = this.initialStyles;
    this.shadowRoot.appendChild(style);

    this.generateQRCode(accessCredentials.ToUri());
    
    this.connectedCallback();
    
  }


  // Function to generate the QR code with the accesCredentials
  async generateQRCode(inputText: string) {
    // const inputText = 'plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1710194226878&name=Plutonication%20test&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Fplutowalleticonwhite'; 
    const qrCodeContainer = this.shadowRoot.getElementById('qr-code');

    try {
        const qrCodeDataURL = await QRCode.toDataURL(inputText);
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = qrCodeDataURL;
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

  showWalletDownloadButtons(walletItem: Element) {
    console.log("this.isNpmPackage", this.isNpmPackage);
    if (this.isNpmPackage) {
      console.log("ES el package");
      this.closeBtn.style.display = 'block';
    } else {
      console.log("ES LA ETENSION");
      this.backBtn.style.display = 'block';

    };
    const qrContainer = this.shadowRoot.querySelector(".plutonication__qr-container");
    const walletsContainer = this.shadowRoot.querySelector(".plutonication__wallets-container");
    const title = this.shadowRoot.querySelector(".plutonication__qr-title");
    const description = walletItem.querySelector('.plutonication__wallets-item-description').textContent;
    const walletUrl = walletItem.getAttribute('href');
    const downloadBtns = this.shadowRoot.querySelector(".plutonication__wallets-btn-container-hidden");

    const qrCotainerInitialContent = qrContainer.innerHTML;

    qrContainer.innerHTML = "";
    walletsContainer.innerHTML = "";
    title.textContent = description;
    downloadBtns.classList.remove("plutonication__wallets-btn-container-hidden");
    downloadBtns.addEventListener('click', () => {
      downloadBtns.classList.add("plutonication__wallets-btn-container-hidden");
      qrContainer.innerHTML = qrCotainerInitialContent;
      this.generateQRCode(walletUrl);
    });
    
  }




// Function to show more wallets if there exists more than four

  /**
   * Opens the modal and displays the QR code generated with the access credentials information.
   * @param {AccessCredentials} accessCredentials - Acces cedentials to generate the QR.
   */
  openModal(accessCredentials: AccessCredentials): void {
    this.isNpmPackage = true;
    // const qrData = accessCredentials.ToUri();
    try {
      // QRCode.toDataURL(qrData, { width: 250 })
      //   .then(url => {
      //     this.qrImage.src = url;
      //     this.qrImage.style.display = 'block';
      //     this.modal.style.display = 'flex';
      //   })
      //   .catch(error => {
      //     console.error('Error generating QR code:', error);
      //   });
      this.generateQRCode(accessCredentials.ToUri());
      this.modal.style.display = 'flex';
      this.closeBtn.style.display = 'block';
      this.backBtn.style.display = 'none';

    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  openExtension(accessCredentials: AccessCredentials): void {
    this.isNpmPackage = false;
    try {
      // QRCode.toDataURL(qrData, { width: 250 })
      //   .then(url => {
      //     this.qrImage.src = url;
      //     this.qrImage.style.display = 'block';
      //     this.modal.style.display = 'flex';
      //   })
      //   .catch(error => {
      //     console.error('Error generating QR code:', error);
      //   });
      this.generateQRCode(accessCredentials.ToUri());
      this.modal.style.display = 'flex';
      this.modal.style.padding = '0';
      this.modal.style.backgroundColor = "white";

      this.closeBtn.style.display = 'none';
      // this.backBtn.style.display = 'block';
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  /**
   * Closes the modal along with the QR code.
   */
  closeModal(): void {
    this.modal.style.display = 'none';
    this.backToInitialView();
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
