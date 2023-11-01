import { randomBytes } from "crypto";

export class AccessCredentials {
  public url: string;
  public key: string;
  public name?: string;
  public icon?: string;

  constructor(url?: string, key?: string, name?: string, icon?: string) {
    this.url = url || this.ToUri();
    this.key = key || AccessCredentials.GenerateKey();
    this.name = name;
    this.icon = icon;
  }
  
  static GenerateKey(length: number = 32): string {
    return randomBytes(length).toString("hex");
  }

  ToUri(): string {
    const queryParams: string[] = [
      `url=${encodeURIComponent(this.url)}`,
      `key=${encodeURIComponent(this.key)}`,
    ];

    if (this.name != null) {
      queryParams.push(`name=${encodeURIComponent(this.name)}`);
    }

    if (this.icon != null) {
      queryParams.push(`icon=${encodeURIComponent(this.icon)}`);
    }
    return `plutonication:?${queryParams.join("&")}`;
  }
}


const accessCredentials = new AccessCredentials(
  "wss://plutonication-53tvi.ondigitalocean.app/plutonication",
  AccessCredentials.GenerateKey(),
  "Galaxy Logic Game", 
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

const connectionUrl = accessCredentials.url;
console.log("connectionUrl", connectionUrl);

const accessKey = accessCredentials.key;
console.log("accessKey", accessKey);

if (accessCredentials.name) {
  const dAppName = accessCredentials.name;
  console.log("Nombre de la dApp:", dAppName);
}

if (accessCredentials.icon) {
  const dAppIcon = accessCredentials.icon;
  console.log("Ícono de la dApp:", dAppIcon);
}

const fullUrl = accessCredentials.ToUri();
console.log("URL completa:", fullUrl);
