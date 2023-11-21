"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccesCredentials_1 = require("../src/AccesCredentials");
describe("AccessCredentials", function () {
    test("No parameters", function () {
        var accessCredentials = new AccesCredentials_1.AccessCredentials();
        expect(accessCredentials.url).toBeDefined();
        expect(accessCredentials.key).toBeDefined();
        expect(accessCredentials.name).toBeUndefined();
        expect(accessCredentials.icon).toBeUndefined();
    });
    test("With parameters", function () {
        var url = "wss://plutonication-acnha.ondigitalocean.app";
        var key = "1";
        var name = "Galaxy Logic Game";
        var icon = "https://rostislavlitovkin.pythonanywhere.com/logo";
        var accessCredentials = new AccesCredentials_1.AccessCredentials(url, key, name, icon);
        expect(accessCredentials.url).toBe(url);
        expect(accessCredentials.key).toBe(key);
        expect(accessCredentials.name).toBe(name);
        expect(accessCredentials.icon).toBe(icon);
    });
    test("Generate key testing", function () {
        var key = AccesCredentials_1.AccessCredentials.GenerateKey();
        var isHex = /^[0-9A-Fa-f]+$/i.test(key);
        expect(isHex).toBe(true);
    });
    test("ToUri testing", function () {
        var accessCredentials = new AccesCredentials_1.AccessCredentials("wss://plutonication-acnha.ondigitalocean.app/", "1", "Galaxy Logic Game", "https://rostislavlitovkin.pythonanywhere.com/logo");
        var expectedUri = "plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1&name=Galaxy%20Logic%20Game&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Flogo";
        expect(accessCredentials.ToUri()).toBe(expectedUri);
    });
});
