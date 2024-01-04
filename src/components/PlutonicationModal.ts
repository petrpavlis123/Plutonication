import * as QRCode from 'qrcode';
import { AccessCredentials } from 'src/AccessCredentials';

 
// export class PlutonicationModal extends HTMLElement {
//     private qrImage: HTMLCanvasElement;
 
//     constructor() {
//         super();
//         this.qrImage = document.createElement('canvas');
//         this.qrImage.setAttribute('id', 'qrCodeContainer');
//         this.appendChild(this.qrImage);
//     }
 
//     connectedCallback(accessCredentials: AccessCredentials): void {
//         this.generateQRCode(accessCredentials);
//     }
 
//     generateQRCode(accessCredentials: AccessCredentials): void {

//         const alphaNumericString = accessCredentials.ToUri();

//         // Generate QR code
//       const qrCodeContainer = document.getElementById('qrCodeContainer');
//       QRCode.toDataURL(alphaNumericString)
//         .then(url => {
//           const img = new Image();
//           img.src = url;
//           qrCodeContainer.innerHTML = '';
//           qrCodeContainer.appendChild(img);
//         })
//         .catch(err => {
//           console.error(err);
//           qrCodeContainer.innerText = 'Error generating QR code';
//         });

//     }

//     hideModal(): void {
//         const qrCodeContainer = document.getElementById('qrCodeContainer');
//         qrCodeContainer.style.display = 'none';
//     }
// }
 
// window.customElements.define('plutonication-modal', PlutonicationModal);

// export class ModalComponent extends HTMLElement {
//     private modal: HTMLElement;
  
//     constructor() {
//       super();
      
//       // Crear el shadow DOM y adjuntar los estilos y el contenido del modal
//       const shadow = this.attachShadow({ mode: 'open' });
  
//       // Estilos para el modal
//       const style = document.createElement('style');
//       style.textContent = `
//         /* Estilos para el modal */
//         .modal {
//           display: none; /* Oculta el modal por defecto */
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
//           justify-content: center;
//           align-items: center;
//         }
        
//         .modal-content {
//           background-color: white;
//           padding: 20px;
//           border-radius: 5px;
//         }
  
//         /* Estilos para el botón de cerrar */
//         .close {
//           color: #aaa;
//           float: right;
//           font-size: 28px;
//           font-weight: bold;
//         }
  
//         .close:hover,
//         .close:focus {
//           color: black;
//           text-decoration: none;
//           cursor: pointer;
//         }
//       `;
//       shadow.appendChild(style);
  
//       // Contenido del modal
//       this.modal = document.createElement('div');
//       this.modal.classList.add('modal');
//       this.modal.innerHTML = `
//         <div class="modal-content">
//           <span class="close">&times;</span>
//           <p>Este es un modal simple. Puedes poner aquí lo que quieras mostrar.</p>
//         </div>
//       `;
//       shadow.appendChild(this.modal);
      
//       // Abrir y cerrar el modal
//       const closeButton = this.modal.querySelector('.close');
//       closeButton?.addEventListener('click', () => {
//         this.closeModal();
//       });
//     }
  
//     openModal(): void {
//       this.modal.style.display = 'flex';
//     }
  
//     closeModal(): void {
//       this.modal.style.display = 'none';
//     }
//   }
  
//   customElements.define('modal-component', ModalComponent);
  


export class ModalComponent extends HTMLElement {
    private modal: HTMLElement;
    private qrImage: HTMLImageElement;
  
    constructor() {
      super();
      
      // Crear el shadow DOM y adjuntar los estilos y el contenido del modal
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Estilos para el modal
      const style = document.createElement('style');
      style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Roboto&display=swap');
        /* Estilos para el modal */
        .modal {
            display: none; /* Oculta el modal por defecto */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background-color: white;
            // padding: 20px;
            border-radius: 5px;
            width: 350px; /* Ancho del modal */
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .modal-content .scan-qr-title {
            margin-bottom: 10px; /* Espaciado inferior para separar el título */
        }
        
        .modal-content .close {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            align-self: flex-end; /* Colocar el botón de cierre al final del contenedor */
            margin-left: auto; /* Empujar el botón hacia la derecha */
        }
        
        .modal-content .qr-code-container {
            display: flex;
            justify-content: center;
            align-items: center;
            /* Agrega cualquier estilo adicional necesario para el contenedor del código QR */
        }
        
        .close {
            position: relative;
            top: 15px;
            right: 15px;
        }
        .scan-qr-title{
            font-size: 1.2rem;
            margin: 0;
        }
        .scan-qr-text{
            padding-bottom: 20px;
        }

        /* Estilos para el botón de cerrar */
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        `;
      shadow.appendChild(style);
  
      // Contenido del modal
      this.modal = document.createElement('div');
      this.modal.classList.add('modal');
      this.modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3 class="scan-qr-title" id="scan-qr-title">Plutonication Connect</h3>
            <div class="qr-code-container"></div>
            <p class="scan-qr-text" id="scan-qr-text">Scan this QR with your phone</p>
        </div>
      `;
      shadow.appendChild(this.modal);
      
      //QR code element
        this.qrImage = document.createElement('img');
        this.qrImage.setAttribute('alt', 'QR Code');
        this.qrImage.style.display = 'none'; // Initially hide the QR code
        this.modal.querySelector('.qr-code-container')?.appendChild(this.qrImage);
      
      // Abrir y cerrar el modal
      const closeButton = this.modal.querySelector('.close');
      closeButton?.addEventListener('click', () => {
        this.closeModal();
      });
    }
  
    openModal(accessCredentials: AccessCredentials): void {
        const qrData = accessCredentials.ToUri();
        try {
            QRCode.toDataURL(qrData, { width: 250 }) // Generate QR code data URL
                .then(url => {
                    this.qrImage.src = url;
                    this.qrImage.style.display = 'block'; // Show the QR code
                    this.modal.style.display = 'flex'; // Show the modal
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
  
  customElements.define('modal-component', ModalComponent);
  