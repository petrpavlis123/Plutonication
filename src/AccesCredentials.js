"use strict";
// @packages
// import { randomBytes } from "crypto";
exports.__esModule = true;
// Class to use correct acces credential information in the wallet
var AccessCredentials = /** @class */ (function () {
    function AccessCredentials(url, key, name, icon) {
        this.url = url || this.ToUri();
        this.key = key || AccessCredentials.GenerateKey();
        this.name = name;
        this.icon = icon;
    }
    AccessCredentials.GenerateKey = function () {
        // return randomBytes(length).toString("hex");
        // const array = new Uint8Array(length);
        // window.crypto.getRandomValues(array);
        // return Array.from(array).map(byte => ("0" + (byte & 0xFF).toString(16)).slice(-2)).join("");
        return Date.now().toString();
    };
    // static GenerateKey(length: number = 32): string {
    //   let randomKey: string;
    //   if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    //     const array = new Uint8Array(length);
    //     window.crypto.getRandomValues(array);
    //     randomKey = Array.from(array).map(byte => ("0" + (byte & 0xFF).toString(16)).slice(-2)).join("");
    //   } 
    //   else {
    //     return randomBytes(length).toString("hex");
    //   }
    //   return randomKey;
    // }
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
