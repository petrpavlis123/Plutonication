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

// const walletsInformation = [
//   {
//     "description": "",
//     "downloadAndroid": "https://play.google.com/store/apps/details?id=com.rostislavlitovkin.plutowallet",
//     "downloadIOS": null,
//     "github": "https://github.com/rostislavLitovkin/plutowallet",
//     "icon": "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite",
//     "name": "PlutoWallet"
//   },
//   {
//     "description": "Test description",
//     "downloadAndroid": null,
//     "downloadIOS": null,
//     "github": "https://github.com/rostislavLitovkin/Nothing",
//     "icon": "https://rostislavlitovkin.pythonanywhere.com/image",
//     "name": "Other test wallet"
//   }
// ]
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
    shadow.innerHTML = template;

    const style = document.createElement('style');
    style.textContent = styles;
    shadow.appendChild(style);

    this.initialContent = template;
    this.initialStyles = styles;

  }

  async connectedCallback() {
    
    // Initializing some elements
    this.modal = this.shadowRoot.querySelector('.plutonication__component');
    this.closeBtn = this.shadowRoot.querySelector('.close');
    this.backBtn = this.shadowRoot.querySelector('.back');

    // Adding wallets content into the HTML
    await this.addWalletsContent();

    //  Showing more wallets when clic the plus btn
    this.plusButton = this.shadowRoot.getElementById('showMoreWallets');
    if (this.plusButton) {
      this.plusButton.addEventListener('click', () => {
        this.showMoreWallets();
      });
    }

    // Showing wallet info to download it.
    const walletItems = this.shadowRoot.querySelectorAll('.plutonication__wallets-item');
    console.log("walletItems", walletItems);
    walletItems.forEach(walletItem => {
      walletItem.addEventListener('click', () => {
        console.log("walletItem", walletItem)
          this.showWalletDownloadButtons(walletItem);
      });
    });

    // Close modal clicking the btn
    this.closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    // Back btn
    this.backBtn.addEventListener('click', () => {
      this.backToInitialView();
    });
  }

  async  fetchData(urlText: string) {
    try {
        const response = await fetch(urlText);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

  async addWalletsContent() {
    try {
      //Fetching api with wallets content
      const walletInfo = await this.fetchData('https://plutonication.com/supported-wallets');
      // const walletInfo = walletsInformation;

      // Adding that content into the html
      const walletsContainer = this.shadowRoot.querySelector('.plutonication__wallets-content');

      walletInfo.forEach((wallet, index) => {
        const walletItem = document.createElement('div');
        walletItem.className = 'plutonication__wallets-item';
        // walletItem.href = wallet.href;
        walletItem.id = `wallet${index + 1}`;
        walletItem.setAttribute('data-download-android', wallet.downloadAndroid);

        const img = document.createElement('img');
        img.src = wallet.icon;
        img.alt = "wallet icon";
        img.width = 50;
        img.height = 50;

        const description = document.createElement('span');
        description.className = 'plutonication__wallets-item-description';
        description.textContent = wallet.name;

        walletItem.appendChild(img);
        walletItem.appendChild(description);

        if (index >= 3) {
          walletItem.classList.add('plutonication__wallets-item-hidden');
        }

        walletsContainer.appendChild(walletItem);
      });
      console.log("walletsContainer after added: ", walletsContainer);

      if (walletInfo.length > 3) {
        const showMoreWallets = document.createElement('div');
        showMoreWallets.id = 'showMoreWallets';
        showMoreWallets.className = 'plutonication__wallets-item-plus';

        const plusIcon = document.createElement('img');
        plusIcon.src = '../../images/plus-icon.svg';
        plusIcon.alt = 'plus icon';
        plusIcon.width = 30;
        plusIcon.height = 30;

        showMoreWallets.appendChild(plusIcon);

        walletsContainer.appendChild(showMoreWallets);
      }
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  }
  /**
   * Return to the initial view of the modal
   */
  backToInitialView() {
    // plutonication__component-override-styles 
    this.shadowRoot.innerHTML = this.initialContent;

    if (!this.isNpmPackage) {
      const elementsToOverride = this.shadowRoot.querySelectorAll('.plutonication__component');
      elementsToOverride.forEach(element => {
          element.classList.add('plutonication__component-override-styles');
      });
    }

    // Restoring original styles
    const style = document.createElement('style');
    style.textContent = this.initialStyles;
    this.shadowRoot.appendChild(style);

    this.generateQRCode(accessCredentials.ToUri());
    
    this.connectedCallback();
    
  }

  /**
   * Generate the QRCode in base an input text
   * * @param {inputText} - Url text of the wallet
   */
  async generateQRCode(inputText: string) {
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

  /**
   * Show more wallet options in case there are more than three.
   */
  showMoreWallets() {
    this.plusButton.style.display = 'none';
    const moreWalletsItem = this.shadowRoot.querySelectorAll('.plutonication__wallets-item-hidden');
    moreWalletsItem.forEach(wallet => {
      wallet.classList.remove('plutonication__wallets-item-hidden');
    });
  }

  /**
   * Display the download buttons for the wallet for both iOS and Windows
   * @param {walletItem} - Specific wallet item
   */
  showWalletDownloadButtons(walletItem: Element) {
    console.log("Entrando aqui!")
    if (this.isNpmPackage) {
      this.closeBtn.style.display = 'block';
    } else {
      this.backBtn.style.display = 'block';

    };
    const qrContainer = this.shadowRoot.querySelector(".plutonication__qr-container");
    const walletsContainer = this.shadowRoot.querySelector(".plutonication__wallets-container");
    const title = this.shadowRoot.querySelector(".plutonication__qr-title");
    const description = walletItem.querySelector('.plutonication__wallets-item-description').textContent;
    // const walletUrl = walletItem.getAttribute('href');
    const downloadBtns = this.shadowRoot.querySelector(".plutonication__wallets-btn-container-hidden");
    const downloadAndroidUrl = walletItem.getAttribute('data-download-android');

    const qrCotainerInitialContent = qrContainer.innerHTML;

    qrContainer.innerHTML = "";
    walletsContainer.innerHTML = "";
    title.textContent = description;
    downloadBtns.classList.remove("plutonication__wallets-btn-container-hidden");
    downloadBtns.addEventListener('click', () => {
      downloadBtns.classList.add("plutonication__wallets-btn-container-hidden");
      qrContainer.innerHTML = qrCotainerInitialContent;
      this.generateQRCode(downloadAndroidUrl);
    });
    
  }

  /**
   * Opens the modal and displays the QR code generated with the access credentials information.
   * @param {AccessCredentials} accessCredentials - Acces cedentials to generate the QR.
   */
  openModal(accessCredentials: AccessCredentials): void {
    this.isNpmPackage = true;
    try {
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
      this.generateQRCode(accessCredentials.ToUri());
      this.modal.style.display = 'flex';
      this.modal.style.padding = '0';
      this.modal.style.backgroundColor = "white";
      this.closeBtn.style.display = 'none';
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
