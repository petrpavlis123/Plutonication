import * as crypto from "crypto";

class AccessCredentials {
  public url: string = "wss://plutonication-acnha.ondigitalocean.app"; 
  public key: string = this.generateRandomKey(); 
  public name?: string; 
  public icon?: string; 

  private generateRandomKey(): string {
    return crypto.randomBytes(length).toString("hex");
  }
}

// Usage example
const credentials = new AccessCredentials();
console.log(credentials);