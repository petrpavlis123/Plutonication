"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessCredentials = void 0;
// Class to use correct acces credential information in the wallet
var AccessCredentials = /** @class */ (function () {
    function AccessCredentials(url, key, name, icon) {
        this.url = url || this.ToUri();
        this.key = key || AccessCredentials.GenerateKey();
        this.name = name;
        this.icon = icon;
    }
    AccessCredentials.GenerateKey = function () {
        return Date.now().toString();
    };
    AccessCredentials.prototype.ToUri = function () {
        var queryParams = [
            "url=".concat(encodeURIComponent(this.url)),
            "key=".concat(encodeURIComponent(this.key)),
        ];
        if (this.name != null) {
            queryParams.push("name=".concat(encodeURIComponent(this.name)));
        }
        if (this.icon != null) {
            queryParams.push("icon=".concat(encodeURIComponent(this.icon)));
        }
        return "plutonication:?".concat(queryParams.join("&"));
    };
    return AccessCredentials;
}());
exports.AccessCredentials = AccessCredentials;
