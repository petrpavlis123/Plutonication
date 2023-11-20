import { AccessCredentials } from "../src/AccesCredentials";

describe("AccessCredentials", () => {
  test("No parameters", () => {
    const accessCredentials = new AccessCredentials();
    expect(accessCredentials.url).toBeDefined();
    expect(accessCredentials.key).toBeDefined();
    expect(accessCredentials.name).toBeUndefined();
    expect(accessCredentials.icon).toBeUndefined();
  });

  test("With parameters", () => {
    const url = "wss://plutonication-acnha.ondigitalocean.app";
    const key = "1";
    const name = "Galaxy Logic Game";
    const icon = "https://rostislavlitovkin.pythonanywhere.com/logo";

    const accessCredentials = new AccessCredentials(url, key, name, icon);

    expect(accessCredentials.url).toBe(url);
    expect(accessCredentials.key).toBe(key);
    expect(accessCredentials.name).toBe(name);
    expect(accessCredentials.icon).toBe(icon);
  });

  test("Generate key testing", () => {
    const key = AccessCredentials.GenerateKey();
    const isHex = /^[0-9A-Fa-f]+$/i.test(key);
    expect(isHex).toBe(true);
  });

  test("ToUri testing", () => {
    const accessCredentials = new AccessCredentials(
      "wss://plutonication-acnha.ondigitalocean.app/",
      "1",
      "Galaxy Logic Game",
      "https://rostislavlitovkin.pythonanywhere.com/logo"
    );

    const expectedUri =
      "plutonication:?url=wss%3A%2F%2Fplutonication-acnha.ondigitalocean.app%2F&key=1&name=Galaxy%20Logic%20Game&icon=https%3A%2F%2Frostislavlitovkin.pythonanywhere.com%2Flogo";

    expect(accessCredentials.ToUri()).toBe(expectedUri);
  });
});
