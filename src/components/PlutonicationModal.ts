import * as QRCode from 'qrcode';
import { AccessCredentials } from '../AccessCredentials';
import  { DOMAttributes }  from 'react';

/**
 * "QR Modal used to connect the dapp to the Plutonication server.
 * @extends HTMLElement
 */
export class PlutonicationModal extends HTMLElement {
  private modal: HTMLElement;
  private qrImage: HTMLImageElement;

  /**
 * Constructor.
 * Creates a new modal and sets up its elements.
 */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Libre+Franklin:wght@100&family=Open+Sans&family=Roboto&display=swap');

      .plutonication__component {
        display: none; /* Hide the modal by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        color: white;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5); 
        
      }

      .plutonication__content {
        margin: 0;
        padding: 1rem;
        width: 320px;
        background-color: #0e1110;
        color: rgb(36, 37, 41);
        font-size: 16px;
        border-radius: 1rem;
      }
      
      .plutonication__qr-container{
        text-align: center;
        border-radius: 1rem;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 30px;
        border-radius: 1rem;
      }
      
      .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
      }

      .plutonication__qr-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .plutonication__qr-code {
        border: 2px solid #020727;
        background-color: #0e1110;
        border-radius: 1rem;
        
      }

      .scan-qr-text{
        padding-bottom: 20px;
      }

      .close:hover,
      .close:focus {
        color: white;
        text-decoration: none;
        cursor: pointer;
      }

      .plutonication__qr-title-container {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center

      }
      
      .plutonication__qr-title {
        margin: 0 6rem;
      }

      img {
        border-radius: 1rem;
      }

      p, span {
        color: white;
        font-size: 1rem;
        font-weight: bolder;
        font-family: 'Roboto', sans-serif;
        font-family: 'Inter', sans-serif;
        font-family: 'Lexend', sans-serif;
        font-family: 'Libre Franklin', sans-serif;
        font-family: 'Open Sans', sans-serif;
      }

      .plutonication__wallets-container {
        border-top: none;
        padding: 1rem 0;
      }
      
      .plutonication__wallets-container p {
        color: white;
      }

      .plutonication__wallets-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); 
        column-gap: 0.5rem;
        row-gap: 0.5rem;
      }

      .plutonication__wallets-item,
      .plutonication__wallets-item-plus {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        // padding-top: 0.4rem;
        padding: 0.4rem 0;
        // padding: 0.5rem 0.5rem;
        
        background-color: #393939;
        border-radius: 10px;
      }

      .plutonication__wallets-item:hover,
      .plutonication__wallets-item-plus:hover {
        cursor:pointer;
      }

      .plutonication__wallets-item img {
        // width: 50px; 
        // height: 50px;
        border-radius: 1rem;
      }

      .plutonication__wallets-item-description {
        display: block;
        text-align: center;
        font-size: 0.65rem;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 70px;
      }

      .plutonication__wallets-item-description:hover {
        white-space: normal;
        width: auto;
      }

      .plutonication__wallets-item:nth-child(4) {
        padding-top: 0;
      }

      .plutonication__social-media-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .plutonication__social-media-container p {
        color: white;

      }

      .plutonication__social-media-container p:hover {
        cursor: pointer;
      }
    
      .plutonication__social-media-container a {
        margin-left: 0.5rem;
      }


    `;
    shadow.appendChild(style);

    // Modal element
    this.modal = document.createElement('div');
    this.modal.classList.add('plutonication__component');
    this.modal.innerHTML = `
      <div class="plutonication__content">
        <div class="plutonication__qr-container">
          <div class="plutonication__qr-title-container">
            <p id="content" class="plutonication__qr-title">Plutonication</p>
            <div>
              <span class="close">&times;</span>
            </div>
          </div>
          <div id="content" class="plutonication__qr-content">
            <div id="qr-code" class="plutonication__qr-code"></div>
          </div>
        </div>
        <div id="wallets" class="plutonication__wallets-container">
          <p>Supported Wallets:</p>
          <div class="plutonication__wallets-content">
            <div href="me.rainbow" id="wallet" class="plutonication__wallets-item">
              <img src="assets/images/rainbow-wallet.png" alt="Github" width="50" height="50">
              <span class="plutonication__wallets-item-description">Rainbow</span>
            </div>
            <div href="io.metamask" id="wallet" class="plutonication__wallets-item"> 
              <img src="assets/images/metamask-wallet.png" alt="Github" width="50" height="50">
              <span class="plutonication__wallets-item-description">Metamask</span>
            </div>
            <div href="com.wallet.crypto.trustapp" id="wallet" class="plutonication__wallets-item">
              <img src="assets/images/trust-wallet.svg" alt="Github" width="50" height="50">
              <span class="plutonication__wallets-item-description">Trust</span>
            </div>
            <div id="showMoreWallets" class="plutonication__wallets-item-plus">
              <img src="assets/images/plus-icon.svg" alt="Más" width="30" height="30">
              <span class="plutonication__wallets-item-description"></span>
            </div>
          </div>
        </div>
        <div id="additional-info" class="plutonication__social-media-container">
            <p>Docs</p>
            <a href="https://github.com/plutonication"><img src="assets/images/github.svg" alt="Github" width="30" height="20"></a>
            <a href="https://t.me/plutonication"><img src="assets/images/telegram.svg" alt="Telegram" width="30" height="20"></a>
            <a href="https://plutonication.com/help"><img src="assets/images/question-mark.svg" alt="Help" width="30" height="20"></a>
        </div>
      </div>
      `;
    shadow.appendChild(this.modal);

    //QR code element
    this.qrImage = document.createElement('img');
    this.qrImage.setAttribute('alt', 'QR Code');
    this.qrImage.style.display = 'none';
    this.modal.querySelector('.plutonication__qr-code')?.appendChild(this.qrImage);

    // Close the modal
    const closeButton = this.modal.querySelector('.close');
    closeButton?.addEventListener('click', () => {
      this.closeModal();
    });

    // Show more wallets
    const showMoreWalletsButton = this.modal.querySelector('#showMoreWallets');
    if (showMoreWalletsButton) {
      showMoreWalletsButton.addEventListener('click', () => {
        this.setupShowMoreWallets();
      });
    }

    // Show wallets download button
    const selectedWallet = this.modal.querySelector('#wallet');
    if (selectedWallet) {
      selectedWallet.addEventListener('click', () => {
        console.log("selecting wallet...");
        this.setupWalletLinks();
      });
    }
  }

  /**
   * Opens the modal and displays the QR code generated with the access credentials information.
   * @param {AccessCredentials} accessCredentials - Acces cedentials to generate the QR.
   */
  openModal(accessCredentials: AccessCredentials): void {
    const qrData = accessCredentials.ToUri();
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

  setupShowMoreWallets() {
    const showMoreWalletsButton = document.getElementById('showMoreWallets');
    const additionalWallets = document.querySelectorAll('.plutonication__wallets-content div:nth-child(n+5)');
    console.log("additionalWallets", additionalWallets);
    console.log("showMoreWalletsButton", showMoreWalletsButton);
    additionalWallets.forEach(wallet => {
        const walletElement = wallet as HTMLElement;
        walletElement.style.display = 'none';
    });

    if (showMoreWalletsButton) {
        console.log("MOSTRANDO WALLETS");
        showMoreWalletsButton.addEventListener('click', event => {
            event.preventDefault();

            additionalWallets.forEach(wallet => {
                const walletElement = wallet as HTMLElement;
                walletElement.style.display = walletElement.style.display === 'none' ? 'block' : 'none';
            });

            showMoreWalletsButton.style.display = 'none';
        });
    }
}

hideQRCode() {
  const qrCodeContainer = document.getElementById('qr-code');
  if (qrCodeContainer) {
      qrCodeContainer.style.display = 'none';
  }
}

setupWalletLinks() {
  const walletLinks = document.querySelectorAll('.plutonication__wallets-item');
  console.log("walletLinks", walletLinks);
  walletLinks.forEach(walletLink => {
      walletLink.addEventListener('click', event => {
          event.preventDefault();

          const walletUrl = walletLink.getAttribute('href');
          const walletNameElement = walletLink.querySelector('.plutonication__wallets-item-description')?.textContent;

          let downloadLinks: { android: string; ios: string; } = { android: '', ios: '' };

          if (walletUrl === 'me.rainbow') {
              downloadLinks = {
                  android: 'https://play.google.com/store/apps/details?id=me.rainbow',
                  ios: 'https://apps.apple.com/us/app/rainbow-bitcoin-wallet/id1441806765'
              };
          } else if (walletUrl === 'io.metamask') {
              downloadLinks = {
                  android: 'https://play.google.com/store/apps/details?id=io.metamask',
                  ios: 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202'
              };
          } else if (walletUrl === 'com.wallet.crypto.trustapp') {
              downloadLinks = {
                  android: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
                  ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409'
              };
          }

          this.showWalletUrl(walletUrl as string, walletNameElement as string, downloadLinks);
          this.hideQRCode();
      });
  });
}

downloadWallet(platform: string,  downloadLinks: { android: string; ios: string; }) {
  // window.downloadWallet = function(platform: string,  downloadLinks: { android: string; ios: string; }) {
      console.log("downloadLinks from downaloadWallet", downloadLinks.android);
      let storeLink = '';
      if (platform === 'android') {
          storeLink = downloadLinks.android;
      } else if (platform === 'ios') {
          storeLink = downloadLinks.ios;
      }

      try {
        QRCode.toDataURL(storeLink, { width: 250 })
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
  
      // generateQRCode(storeLink);
  
      // window.location.href = storeLink;
  
      const walletContainer = document.getElementById('wallets');
      if (walletContainer) {
          walletContainer.innerHTML = '';
      }
      
      const qrContainer = document.getElementById('qr-code');
      if (qrContainer) {
          qrContainer.style.display = 'block';
      }
  
      // const additionalInfo = document.getElementById('additional-info');
      // if (additionalInfo) {
      //     additionalInfo.style.display = 'block';
      // }
  }

showWalletUrl(url: string, walletNameElement: string, downloadLinks: { android: string, ios: string }) {
  console.log("downloadLinks", downloadLinks);
  let originalWalletsContent = '';
  const walletContainer = document.getElementById('wallets');
  const qrContainer = document.getElementById('qr-code');
  const walletTitle = document.querySelector('.plutonication__qr-title') as HTMLElement;

  if (qrContainer) qrContainer.style.display = 'none';
  if (walletTitle) walletTitle.textContent = `${walletNameElement}`;

  if (!originalWalletsContent && walletContainer) {
      originalWalletsContent = walletContainer.innerHTML;
  }


  const closeButtonSpan = document.createElement('span');
  closeButtonSpan.classList.add('back-button-img');
  closeButtonSpan.innerHTML = '&times;';
  
  const closeButtonContainer = document.createElement('div');
  walletTitle?.parentNode?.insertBefore(closeButtonContainer, walletTitle?.nextSibling); 
  closeButtonContainer.appendChild(walletTitle);
  closeButtonContainer.appendChild(closeButtonSpan); 


  closeButtonSpan.addEventListener('click', () => {
      if (qrContainer) qrContainer.style.display = 'block';
      if (walletTitle) walletTitle.textContent = 'Plutonication';
      if (walletContainer) {
          walletContainer.innerHTML = originalWalletsContent;
          originalWalletsContent = '';
          this.setupWalletLinks();
          this.setupShowMoreWallets();
      }
      closeButtonSpan.remove();
      try {
        QRCode.toDataURL('plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1710194226878&name=Plutonication%20test&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Fplutowalleticonwhite', { width: 250 })
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
      // generateQRCode('plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1710194226878&name=Plutonication%20test&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Fplutowalleticonwhite');
      
    });

  const newContent = `
      <div class="plutonication__wallets-btn-container">
          <button data-platform="android" class="plutonication__wallets-btn-download">
              <div class="plutonication__wallets-btn-content">
                  <img src="images/google-play.svg" alt="google" width="30" height="30"/>
                  <div>
                      <p class="plutonication__wallets-btn-p1">Get in on</p>
                      <p class="plutonication__wallets-btn-p2">Google Play</p>
                  </div>
              </div>
          </button>
          <button data-platform="ios" class="plutonication__wallets-btn-download"> 
              <div class="plutonication__wallets-btn-content">
                  <img src="images/apple-icon.svg" alt="apple" width="30" height="30"/>
                  <div>
                      <p class="plutonication__wallets-btn-p1">Download on the</p>
                      <p class="plutonication__wallets-btn-p2">App Store</p>
                  </div>
              </div>
          </button>
      </div>
  `;

  if (walletContainer) {
      walletContainer.innerHTML = newContent;
      const walletButtons = document.querySelectorAll('.plutonication__wallets-btn-download');
      walletButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const platform = button.getAttribute('data-platform');
              if (platform === 'android') {
                  this.downloadWallet('android', downloadLinks);
              } else if (platform === 'ios') {
                  this.downloadWallet('ios', downloadLinks);
              }
          });
      });
  };
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
