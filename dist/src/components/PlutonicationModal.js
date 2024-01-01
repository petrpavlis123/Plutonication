"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutonicationModal = void 0;
var QRCode = require("davidshimjs-qrcodejs");
var PlutonicationModal = /** @class */ (function (_super) {
    __extends(PlutonicationModal, _super);
    function PlutonicationModal() {
        var _this = _super.call(this) || this;
        var shadowRoot = _this.attachShadow({ mode: "open" });
        var template = "\n      <div class= \"qr-container\" id=\"qr-container\">\n        <div>\n          <h4 class=\"welcome-title\" id=\"welcome-title\" >Welcome to Plutonication</h4>\n          <div class=\"generate-btn-container\" id=\"generate-btn-container\">\n            <button class=\"generate-btn\" id=\"generate-btn\">Generar QR</button>\n          </div>\n          <div class=\"scan-qr-container\" id=\"scan-qr-container\">\n            <div class=\"scan-qr-title-container\" id=\"scan-qr-title-container\">\n              <p class=\"scan-qr-title\" id=\"scan-qr-title\" > Plutonication Connect </p>\n            </div>\n            <img class= \"qr-back-arrow\" id=\"qr-back-arrow\" alt=\"close\" src=\"../../assets/svg/Arrow Back.svg\" width={25}\n          height={25}></div>\n            <div class= \"qr-code-container\" id=\"qr-code-container\">\n              <div class= \"qr-code\" id=\"qr-code\" ></div>\n            </div>\n            <div class=\"scan-qr-text-container\" id=\"scan-qr-text-container\" >\n              <p class=\"scan-qr-text\" id=\"scan-qr-text\"> Scan this QR with your phone</p>\n            </div>\n          </div>\n          <div>\n            <div id=\"connection-info\" class=\"connection-info\">Connected to: </div>\n            <div class= \"generate-btn-container\" id=\"generate-btn-container\">\n              <button class= \"disconnect-btn\" id=\"disconnect-btn\" > Disconnect </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      ";
        var container = document.createElement("div");
        container.innerHTML = template;
        shadowRoot.appendChild(container);
        // const template=document.getElementById("qr-generator-template").content;
        // shadowRoot.appendChild(template.cloneNode(true));
        // Create styles tags
        var styleTag = document.createElement("style");
        // Adding tag to html
        // document.head.appendChild(styleTag);
        shadowRoot.appendChild(styleTag);
        _this.generateButton = shadowRoot.getElementById("generate-btn");
        _this.welcomeHeader = shadowRoot.getElementById("welcome-title");
        _this.qrCodeDiv = shadowRoot.getElementById("qr-code");
        _this.scanQrContainer = shadowRoot.getElementById("scan-qr-container");
        _this.qrContainer = shadowRoot.getElementById("qr-code-container");
        _this.scanText = shadowRoot.getElementById("scan-qr-text-container");
        _this.connectionInfoDiv = shadowRoot.getElementById("connection-info");
        _this.disconnectBtn = shadowRoot.getElementById("disconnect-btn");
        _this.backToConnectBtn = shadowRoot.getElementById("qr-back-arrow");
        _this.backToConnectBtn.addEventListener("click", function () {
            //dappClient.disconnectServer();
            _this.qrCodeDiv.innerHTML = "";
            _this.scanQrContainer.style.display = "none";
            _this.qrContainer.style.display = "none";
            _this.scanText.style.display = "none";
            _this.generateButton.style.display = "block";
            _this.welcomeHeader.style.display = "block";
        });
        return _this;
    }
    PlutonicationModal.prototype.open = function (accessCredentials) {
        //const qrDiv=shadowRoot.getElementById("qr-container");
        var inputValue = accessCredentials.ToUri();
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
        }
        else {
            console.log("Input is empty");
        }
        //await connectToServerAndListen();
    };
    return PlutonicationModal;
}(HTMLElement));
exports.PlutonicationModal = PlutonicationModal;
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
customElements.define("plutonication-modal", PlutonicationModal);
