import QRCode from 'qrcode';
import { AccessCredentials } from '../AccessCredentials';
import  { DOMAttributes }  from 'react';

/**
 * "QR Modal used to connect the dapp to the Plutonication server.
 * @extends HTMLElement
 */

// const template = require('./plutonication-modal.html');
// const styles = require("./plutonication-modal.scss");

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plutonication</title>
    <base href="/"> 
    <!-- <link rel="stylesheet" href="lib/main.css"> -->
    <!-- <script src="lib/plutonication.js"></script>   -->
  </head>
<body>
  <main class="plutonication__component">
    <div>
      <div class="plutonication__qr-header">
        <p class="plutonication__qr-title">Plutonication</p>
        <span class="close">&times;</span>
      </div>
      <div class="plutonication__qr-container">
        <!-- <img src="../../images/arrow-back.svg" alt="back" width="20" height="20"> -->
        <div id="content" class="plutonication__qr-content">
          <div id="qr-code" class="plutonication__qr-code"></div>
        </div>
        <!-- <p class="scan-qr-text" id="scan-qr-text">Scan this QR with your phone.</p> -->
      </div>
      <div id="wallets" class="plutonication__wallets-container">
        <p>Supported Wallets:</p>
        <div class="plutonication__wallets-content">
          <div href="me.rainbow" id="wallet1" class="plutonication__wallets-item">
            <img src="../../images/rainbow-wallet.png" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Rainbow</span>
          </div>
          <div href="io.metamask" id="wallet1" class="plutonication__wallets-item"> 
            <img src="../../images/metamask-wallet.png" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Metamask</span>
          </div>
          <div href="com.wallet.crypto.trustapp" id="wallet2" class="plutonication__wallets-item">
            <img src="../../images/trust-wallet.svg" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Trust</span>
          </div>
          <div id="showMoreWallets" class="plutonication__wallets-item-plus">
            <img src="../../images/plus-icon.svg" alt="Más" width="30" height="30">
            <span class="plutonication__wallets-item-description"></span>
          </div>
          <div href="www.wallet1.com" id="wallet1" class="plutonication__wallets-item plutonication__wallets-item-hidden"> 
            <img src="../../images/metamask-wallet.png" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Metamask</span>
          </div>
          <div href="www.wallet1.com" id="wallet1" class="plutonication__wallets-item plutonication__wallets-item-hidden">
            <img src="../../images/rainbow-wallet.png" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Rainbow</span>
          </div>
          <div href="www.wallet2.com" id="wallet2" class="plutonication__wallets-item plutonication__wallets-item-hidden">
            <img src="../../images/trust-wallet.svg" alt="Github" width="50" height="50">
            <span class="plutonication__wallets-item-description">Trust</span>
          </div>
        </div>
      </div>
      <div class="plutonication__wallets-btn-container plutonication__wallets-btn-container-hidden">
        <button data-platform="android" class="plutonication__wallets-btn-download">
            <div class="plutonication__wallets-btn-content">
                <img src="../../images/google-play.svg" alt="google" width="30" height="30"/>
                <div>
                    <p class="plutonication__wallets-btn-p1">Get in on</p>
                    <p class="plutonication__wallets-btn-p2">Google Play</p>
                </div>
            </div>
        </button>
        <button data-platform="ios" class="plutonication__wallets-btn-download"> 
            <div class="plutonication__wallets-btn-content">
                <img src="../../images/apple-icon.svg" alt="apple" width="30" height="30"/>
                <div>
                    <p class="plutonication__wallets-btn-p1">Download on the</p>
                    <p class="plutonication__wallets-btn-p2">App Store</p>
                </div>
            </div>
        </button>
    </div>
      <div id="additional-info" class="plutonication__social-media-container">
          <a href="https://plutonication.com/">Docs</a>
          <a href="https://github.com/rostislavLitovkin/plutonication" target="_blank"><img src="../../images/github.svg" alt="Github" width="20" height="20"></a>
          <a href="https://t.me/+CN8Ux4dPAZ8yZWU0" target="_blank"><img src="../../images/telegram.svg" alt="Telegram" width="20" height="20"></a>
          <a href="https://plutonication.com/" target="_blank"><img src="../../images/question-mark.svg" alt="Help" width="20" height="20"></a>
      </div>
      
    </div>
  </main>
</body>
</html>

`

const styles = `
@import url(https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Libre+Franklin:wght@100&family=Open+Sans&family=Roboto&display=swap);
.plutonication__component{margin:0;padding:1rem;border-radius:1rem;font-size:1rem;font-family:"Roboto","Inter","Lexend","Libre Franklin","Open Sans",sans-serif;width:320px;background-color:#0e1110;color:#242529;line-height:26px;border:1px solid #fff;display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);justify-content:center;align-items:center;z-index:9999}.plutonication__component>div{background-color:#0e1110;border-radius:5px;width:300px;align-items:center;padding:20px 30px;border-radius:1rem}.plutonication__component>div .plutonication__qr-header{display:flex;justify-content:center}.plutonication__component>div .plutonication__qr-header .close{position:relative;left:100px;color:#aaa;font-size:28px;font-weight:bold}.plutonication__component>div .plutonication__qr-header .close:hover,.plutonication__component>div .plutonication__qr-header .close:focus{color:#fff;text-decoration:none;cursor:pointer}.plutonication__component .plutonication__qr-title,.plutonication__component .plutonication__social-media-container p,.plutonication__component .plutonication__wallets-container p,.plutonication__component .plutonication__wallets-item-description{margin:0;color:#fff;font-weight:bold}.plutonication__component .plutonication__qr-container{text-align:center;background-color:#0e1110;border-radius:1rem}.plutonication__component .plutonication__qr-container div:first-child{display:flex;justify-content:center}.plutonication__component .plutonication__qr-container div:first-child p{width:280px;margin-left:1.3rem}.plutonication__component .plutonication__qr-container div:first-child span{color:#aaa;font-size:28px;font-weight:bold;font-family:"Open Sans",sans-serif}.plutonication__component .plutonication__qr-container div:first-child span:hover{cursor:pointer;color:#fff}.plutonication__component .plutonication__qr-container .plutonication__qr-content{display:flex;flex-direction:column;align-items:center}.plutonication__component .plutonication__qr-container .plutonication__qr-content .plutonication__qr-code{border:2px solid #020727;background-color:#0e1110;border-radius:1rem;margin:1rem}.plutonication__component .plutonication__qr-container .plutonication__qr-content .plutonication__qr-code img{height:200px;width:200px;border-radius:10px;display:block;margin:auto;background-color:#fff}.plutonication__component .plutonication__wallets-container{border-top:none;padding:1rem 0}.plutonication__component .plutonication__wallets-container p{font-size:.7rem}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content{display:grid;grid-template-columns:repeat(auto-fill, minmax(60px, 1fr));column-gap:.5rem;row-gap:.5rem}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item,.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;text-decoration:none;padding-top:.4rem;background-color:#393939;border-radius:10px}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item .plutonication__wallets-item img,.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus .plutonication__wallets-item img{border-radius:1rem}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item .plutonication__wallets-item-description,.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus .plutonication__wallets-item-description{display:block;text-align:center;font-size:.65rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:70px}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item .plutonication__wallets-item-description:hover,.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus .plutonication__wallets-item-description:hover{white-space:normal;width:auto}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-hidden{display:none}.plutonication__component .plutonication__wallets-container .plutonication__wallets-content div:hover{cursor:pointer}.plutonication__component .plutonication__wallets-btn-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center;height:200px}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download{border-radius:.5rem;background:#393939;color:#fff;padding:.4rem;border-color:#393939}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download:hover{cursor:pointer}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content{display:flex;justify-content:center;align-items:center;width:140px}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content img{margin-right:.3rem}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content .plutonication__wallets-btn-p1{font-size:.7rem;text-align:justify;margin:0}.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content .plutonication__wallets-btn-p2{font-size:.9rem;text-align:justify;margin:0}.plutonication__component .plutonication__wallets-btn-container-hidden{display:none}.plutonication__component .plutonication__social-media-container{display:flex;justify-content:flex-end;align-items:center}.plutonication__component .plutonication__social-media-container>a:first-of-type{text-decoration:none;color:#fff}.plutonication__component .plutonication__social-media-container a{margin-left:1rem}
`
export class PlutonicationModal extends HTMLElement {
  private modal: HTMLElement;
  private plusButton: HTMLElement;

  /**
 * Constructor.
 * Creates a new modal and sets up its elements.
 */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    // shadow.innerHTML = template.default;
    shadow.innerHTML = template;
    console.log("styles", styles);

    const style = document.createElement('style');
    style.textContent = styles;
    shadow.appendChild(style);

    // const styleElement = document.createElement('link');
    // styleElement.rel = 'stylesheet';
    // styleElement.href = 'lib/main.css'; 
    // shadow.appendChild(styleElement);

    // Adding js
    // const scriptElement = document.createElement('script');
    // scriptElement.src = 'lib/plutonication.js'; 
    // shadow.appendChild(scriptElement);


  }

  connectedCallback() {
    // const accessCredentials = new AccessCredentials(
    //     "wss://plutonication-acnha.ondigitalocean.app/",
    //     "Plutonication test",
    //     "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
    // );
    
    // Generating QRcode with acces credentials
    // this.generateQRCode(accessCredentials.ToUri());

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

    this.modal = this.shadowRoot.querySelector('.plutonication__component') as HTMLElement;
    console.log("this.modal.style.display", this.modal.style.display);


    // Close modal clicking the btn
    const closeButton = this.shadowRoot.querySelector('.close');
    closeButton.addEventListener('click', () => {
      this.closeModal();
    });
    

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
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  openExtension(accessCredentials: AccessCredentials): void {
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
      this.modal.style.display = 'block';
      this.modal.style.padding = '0';
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  /**
   * Closes the modal along with the QR code.
   */
  closeModal(): void {
    this.modal.style.display = 'none';
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
