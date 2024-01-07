"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var QRCode = require("qrcode");
var PlutonicationModal = /** @class */ (function (_super) {
    __extends(PlutonicationModal, _super);
    function PlutonicationModal() {
        var _a;
        var _this = _super.call(this) || this;
        var shadow = _this.attachShadow({ mode: 'open' });
        var style = document.createElement('style');
        style.textContent = "\n      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Roboto&display=swap');\n\n      .modal {\n        display: none; /* Hide the modal by default */\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.5); \n        justify-content: center;\n        align-items: center;\n      }\n      \n      .modal-content {\n        background-color: white;\n        border-radius: 5px;\n        width: 350px; /* Modal width */\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n      }\n      \n      .modal-content .scan-qr-title {\n        margin-bottom: 10px; \n      }\n      \n      .modal-content .close {\n        color: #aaa;\n        font-size: 28px;\n        font-weight: bold;\n        align-self: flex-end; /* Place the close button at the end of the container */\n        margin-left: auto; \n      }\n      \n      .modal-content .qr-code-container {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n      }\n      \n      .close {\n        position: relative;\n        top: 15px;\n        right: 15px;\n      }\n      .scan-qr-title{\n        font-size: 1.2rem;\n        margin: 0;\n      }\n      .scan-qr-text{\n        padding-bottom: 20px;\n      }\n\n      .close:hover,\n      .close:focus {\n        color: black;\n        text-decoration: none;\n        cursor: pointer;\n      }\n    ";
        shadow.appendChild(style);
        // Modal element
        _this.modal = document.createElement('div');
        _this.modal.classList.add('modal');
        _this.modal.innerHTML = "\n        <div class=\"modal-content\">\n            <span class=\"close\">&times;</span>\n            <h3 class=\"scan-qr-title\" id=\"scan-qr-title\">Plutonication</h3>\n            <div class=\"qr-code-container\"></div>\n            <p class=\"scan-qr-text\" id=\"scan-qr-text\">Scan this QR with your phone.</p>\n        </div>\n      ";
        shadow.appendChild(_this.modal);
        //QR code element
        _this.qrImage = document.createElement('img');
        _this.qrImage.setAttribute('alt', 'QR Code');
        _this.qrImage.style.display = 'none';
        (_a = _this.modal.querySelector('.qr-code-container')) === null || _a === void 0 ? void 0 : _a.appendChild(_this.qrImage);
        // Close the modal
        var closeButton = _this.modal.querySelector('.close');
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', function () {
            _this.closeModal();
        });
        return _this;
    }
    PlutonicationModal.prototype.openModal = function (accessCredentials) {
        var _this = this;
        var qrData = accessCredentials.ToUri();
        try {
            QRCode.toDataURL(qrData, { width: 250 })
                .then(function (url) {
                _this.qrImage.src = url;
                _this.qrImage.style.display = 'block';
                _this.modal.style.display = 'flex';
            })["catch"](function (error) {
                console.error('Error generating QR code:', error);
            });
        }
        catch (error) {
            console.error('Error generating QR code:', error);
        }
    };
    PlutonicationModal.prototype.closeModal = function () {
        this.modal.style.display = 'none';
        this.qrImage.style.display = 'none';
    };
    return PlutonicationModal;
}(HTMLElement));
exports.PlutonicationModal = PlutonicationModal;
customElements.define('plutonication-modal', PlutonicationModal);
