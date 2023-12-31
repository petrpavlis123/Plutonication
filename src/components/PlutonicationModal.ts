/* eslint-disable @typescript-eslint/no-misused-promises */
import QRCode from "qrcodejs";
import { AccessCredentials } from "../AccessCredentials";

export class PlutonicationModal extends HTMLElement {

  generateButton: HTMLElement;
  welcomeHeader: HTMLElement;
  qrCodeDiv: HTMLElement;
  scanQrContainer: HTMLElement;
  qrContainer: HTMLElement;
  scanText: HTMLElement;
  connectionInfoDiv: HTMLElement;
  disconnectBtn: HTMLElement;
  backToConnectBtn: HTMLElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = `
      <div class= "qr-container" id="qr-container">
        <div>
          <h4 class="welcome-title" id="welcome-title" >Welcome to Plutonication</h4>
          <div class="generate-btn-container" id="generate-btn-container">
            <button class="generate-btn" id="generate-btn">Generar QR</button>
          </div>
          <div class="scan-qr-container" id="scan-qr-container">
            <div class="scan-qr-title-container" id="scan-qr-title-container">
              <p class="scan-qr-title" id="scan-qr-title" > Plutonication Connect </p>
            </div>
            <img class= "qr-back-arrow" id="qr-back-arrow" alt="close" src="../../assets/svg/Arrow Back.svg" width={25}
          height={25}></div>
            <div class= "qr-code-container" id="qr-code-container">
              <div class= "qr-code" id="qr-code" ></div>
            </div>
            <div class="scan-qr-text-container" id="scan-qr-text-container" >
              <p class="scan-qr-text" id="scan-qr-text"> Scan this QR with your phone</p>
            </div>
          </div>
          <div>
            <div id="connection-info" class="connection-info">Connected to: </div>
            <div class= "generate-btn-container" id="generate-btn-container">
              <button class= "disconnect-btn" id="disconnect-btn" > Disconnect </button>
            </div>
          </div>
        </div>
      </div>
      `;
    const container = document.createElement("div");
    container.innerHTML = template;
    shadowRoot.appendChild(container);
    // const template=document.getElementById("qr-generator-template").content;
    // shadowRoot.appendChild(template.cloneNode(true));

    // Create styles tags

    const styleTag = document.createElement("style");

    // Adding tag to html
    // document.head.appendChild(styleTag);
    shadowRoot.appendChild(styleTag);

    this.generateButton = shadowRoot.getElementById("generate-btn")!;
    this.welcomeHeader = shadowRoot.getElementById("welcome-title")!;
    this.qrCodeDiv = shadowRoot.getElementById("qr-code")!;
    this.scanQrContainer = shadowRoot.getElementById("scan-qr-container")!;
    this.qrContainer = shadowRoot.getElementById("qr-code-container")!;
    this.scanText = shadowRoot.getElementById("scan-qr-text-container")!;
    this.connectionInfoDiv = shadowRoot.getElementById("connection-info")!;
    this.disconnectBtn = shadowRoot.getElementById("disconnect-btn")!;
    this.backToConnectBtn = shadowRoot.getElementById("qr-back-arrow")!;

    this.backToConnectBtn.addEventListener("click", () => {
      //dappClient.disconnectServer();
      this.qrCodeDiv.innerHTML = ""
      this.scanQrContainer.style.display = "none";
      this.qrContainer.style.display = "none";
      this.scanText.style.display = "none";
      this.generateButton.style.display = "block";
      this.welcomeHeader.style.display = "block";
    });

  }

  open(accessCredentials: AccessCredentials): void {
    //const qrDiv=shadowRoot.getElementById("qr-container");

    const inputValue = accessCredentials.ToUri();

    this.scanQrContainer.style.display = "block";
    this.qrContainer.style.display = "flex";
    this.scanText.style.display = "block";
    this.generateButton.style.display = "none";
    this.welcomeHeader.style.display = "none";

    if (inputValue.trim() !== "") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new QRCode(this.qrCodeDiv, {
        text: inputValue,
        width: 200,
        height: 200,
      });

    } else {
      console.log("Input is empty");
    }

    //await connectToServerAndListen();
  }
}

/*
  const connectToServerAndListen = async () => {
    console.log("Inicializando la vuelta")
    dappClient = initializePlutonicationDAppClient(accessCredentials);
    // Initialize connection
    await dappClient.initializeAsync();
    // Receive pubKey
    const pubKey = await dappClient.receivePubKeyAsync();

    // Use the pubKey as need it
    console.log("La pubKey es:", pubKey);
    if (pubKey !== "") {
      console.log("entrando aquí")
      connectionInfoDiv.style.display = "block";
      connectionInfoDiv.textContent += pubKey;
      qrCodeDiv.style.display = "none";
      scanQrContainer.style.display = "none";
      qrContainer.style.display = "none";
      scanText.style.display = "none";
      disconnectBtn.style.display = "block"
    }
  };

disconnectBtn.addEventListener("click", () => {
  console.log("Desconexión iniciada");
  if (dappClient) {
    dappClient.disconnect();
  }
  else {
    console.log("dappClient is not connected");
  }
  qrCodeDiv.innerHTML = "";
  qrCodeDiv.style.display = "block";
  generateButton.style.display = "block";
  welcomeHeader.style.display = "block";
  connectionInfoDiv.style.display = "none";
  disconnectBtn.style.display = "none";
});
  
  }

}
*/

customElements.define("plutonication-modal", PlutonicationModal)
