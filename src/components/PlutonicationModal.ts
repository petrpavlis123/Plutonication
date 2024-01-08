import * as QRCode from 'qrcode';
import { AccessCredentials } from '../AccessCredentials';

export class PlutonicationModal extends HTMLElement {
  private modal: HTMLElement;
  private qrImage: HTMLImageElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Libre+Franklin:wght@100&family=Open+Sans&family=Roboto&display=swap');

      * {

      }

      .modal {
        display: none; /* Hide the modal by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); 
        justify-content: center;
        align-items: center;
        
      }
      
      .modal-content {
        background-color: #0e1110;
        border-radius: 5px;
        width: 350px; /* Modal width */
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 30px;
        border-radius: 1rem;
      }
      
      .modal-content .scan-qr-title {
        margin-bottom: 1rem;
      }
      
      .modal-content .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        align-self: flex-end; /* Place the close button at the end of the container */
        margin-left: auto; 
      }
      
      .modal-content .qr-code-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .close {
        position: relative;
        top: 22px;
        right: 15px;
      }
      .scan-qr-title{
        font-size: 1.2rem;
        margin: 0;
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

      .qr-code-container {
        border-radius: 1rem;
      }

      img {
        border-radius: 1rem;
      }

      .scan-qr-title, .scan-qr-text  {
        color: white;
        font-size: 1rem;
        font-weight: bolder;
        font-family: 'Roboto', sans-serif;
        font-family: 'Inter', sans-serif;
        font-family: 'Lexend', sans-serif;
        font-family: 'Libre Franklin', sans-serif;
        font-family: 'Open Sans', sans-serif;
      }
    `;
    shadow.appendChild(style);

    // Modal element
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p class="scan-qr-title" id="scan-qr-title">Plutonication</p>
            <div class="qr-code-container"></div>
            <p class="scan-qr-text" id="scan-qr-text">Scan this QR with your phone.</p>
        </div>
      `;
    shadow.appendChild(this.modal);

    //QR code element
    this.qrImage = document.createElement('img');
    this.qrImage.setAttribute('alt', 'QR Code');
    this.qrImage.style.display = 'none';
    this.modal.querySelector('.qr-code-container')?.appendChild(this.qrImage);

    // Close the modal
    const closeButton = this.modal.querySelector('.close');
    closeButton?.addEventListener('click', () => {
      this.closeModal();
    });
  }

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

  closeModal(): void {
    this.modal.style.display = 'none';
    this.qrImage.style.display = 'none';
  }
}

// Define the html web component
customElements.define('plutonication-modal', PlutonicationModal);
