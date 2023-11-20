"use strict";
exports.__esModule = true;
// @packages
var crypto_1 = require("crypto");
// Class to use correct acces credential information in the wallet
var AccessCredentials = /** @class */ (function () {
    function AccessCredentials(url, key, name, icon) {
        this.url = url || this.ToUri();
        this.key = key || AccessCredentials.GenerateKey();
        this.name = name;
        this.icon = icon;
    }
    // static GenerateKey(length: number = 32): string {
    //   // return randomBytes(length).toString("hex");
    //   const array = new Uint8Array(length);
    //   window.crypto.getRandomValues(array);
    //   return Array.from(array).map(byte => ("0" + (byte & 0xFF).toString(16)).slice(-2)).join("");
    // }
    AccessCredentials.GenerateKey = function (length) {
        if (length === void 0) { length = 32; }
        var randomKey;
        if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
            var array = new Uint8Array(length);
            window.crypto.getRandomValues(array);
            randomKey = Array.from(array).map(function (byte) { return ("0" + (byte & 0xFF).toString(16)).slice(-2); }).join("");
        }
        else {
            return crypto_1.randomBytes(length).toString("hex");
        }
        return randomKey;
    };
    AccessCredentials.prototype.ToUri = function () {
        var queryParams = [
            "url=" + encodeURIComponent(this.url),
            "key=" + encodeURIComponent(this.key),
        ];
        if (this.name != null) {
            queryParams.push("name=" + encodeURIComponent(this.name));
        }
        if (this.icon != null) {
            queryParams.push("icon=" + encodeURIComponent(this.icon));
        }
        return "plutonication:?" + queryParams.join("&");
    };
    return AccessCredentials;
}());
exports.AccessCredentials = AccessCredentials;
var customAccessCredentials = new AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/");
console.log("URL:", customAccessCredentials.url);
console.log("Key:", customAccessCredentials.key);
