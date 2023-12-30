/* eslint-disable @typescript-eslint/no-misused-promises */
import cssStyles from "./PlutonicationModel.css";

class PlutonicationModal extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = `
      < div class= "qr-container" id = "qr-container" >
        < div >
          < h4 class= "welcome-title" id = "welcome-title" > Welcome to Plutonication</h4>
          <div class= "generate-btn-container" id = "generate-btn-container" >
            < button class= "generate-btn" id = "generate-btn" > Generar QR </ button >
          </ div >
          < div class= "scan-qr-container" id = "scan-qr-container" >
            < div class= "scan-qr-title-container" id = "scan-qr-title-container" >
              < p class= "scan-qr-title" id = "scan-qr-title" > Plutonication Connect </ p >
            </ div >
            < img class= "qr-back-arrow" id = "qr-back-arrow" alt = "close" src = "../../assets/svg/Arrow Back.svg" width ={ 25}
          height ={ 25}></ div >
            < div class= "qr-code-container" id = "qr-code-container" >
              < div class= "qr-code" id = "qr-code" ></ div >
            </ div >
            < div class= "scan-qr-text-container" id = "scan-qr-text-container" >
              < p class= "scan-qr-text" id = "scan-qr-text" > Scan this QR with your phone</p>
            </div>
          </div>
          <div>
            <div id="connection-info" class= "connection-info" > Connected to: </ div >
            < div class= "generate-btn-container" id = "generate-btn-container" >
              < button class= "disconnect-btn" id = "disconnect-btn" > Disconnect </ button >
            </ div >
          </ div >
        </ div >
      </ div >
      `;
    const container = document.createElement("div");
    container.innerHTML = template;
    shadowRoot.appendChild(container);
    // const template = document.getElementById("qr-generator-template").content;
    // shadowRoot.appendChild(template.cloneNode(true));

    // Create styles tags

    const styleTag = document.createElement("style");

    // Adding tag to html
    // document.head.appendChild(styleTag);
    shadowRoot.appendChild(styleTag);

    const generateButton: HTMLElement = shadowRoot.getElementById("generate-btn")!;
    const welcomeHeader: HTMLElement = shadowRoot.getElementById("welcome-title")!;
    const qrCodeDiv: HTMLElement = shadowRoot.getElementById("qr-code")!;
    const scanQrContainer: HTMLElement = shadowRoot.getElementById("scan-qr-container")!;
    const qrContainer: HTMLElement = shadowRoot.getElementById("qr-code-container")!;
    const scanText: HTMLElement = shadowRoot.getElementById("scan-qr-text-container")!;
    const connectionInfoDiv: HTMLElement = shadowRoot.getElementById("connection-info")!;
    const disconnectBtn: HTMLElement = shadowRoot.getElementById("disconnect-btn")!;
    const backToConnectBtn: HTMLElement = shadowRoot.getElementById("qr-back-arrow")!;
    //const qrDiv = shadowRoot.getElementById("qr-container");
    const inputValue = "";


    
    generateButton.addEventListener("click", async () => {
      inputValue = accessCredentials.ToUri();

      scanQrContainer.style.display = "block";
      qrContainer.style.display = "flex";
      scanText.style.display = "block";
      generateButton.style.display = "none";
      welcomeHeader.style.display = "none";
      if (inputValue.trim() !== "") {
        // Generar el código QR
        new QRCode(qrCodeDiv, {
          text: inputValue,
          width: 200,
          height: 200,
        });
      } else {
        console.log("Error generating QR Code");
      }
      await connectToServerAndListen();

    });

    backToConnectBtn.addEventListener("click", () => {
      dappClient.disconnectServer();
      qrCodeDiv.innerHTML = ""
      scanQrContainer.style.display = "none";
      qrContainer.style.display = "none";
      scanText.style.display = "none";
      generateButton.style.display = "block";
      welcomeHeader.style.display = "block";
    });

    const connectToServerAndListen = async () => {
      console.log("Inicializando la vuelta")
      dappClient = new PlutonicationDAppClient(accessCredentials);
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
        dappClient.disconnectServer();
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

customElements.define("plutonication-modal", PlutonicationModal)

export default PlutonicationModal;