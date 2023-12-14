// @packages
import { Socket, io } from "socket.io-client";
import { AccessCredentials } from "./AccesCredentials";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady, mnemonicGenerate, encodeAddress } from "@polkadot/util-crypto";
import { stringToU8a, u8aToHex } from "@polkadot/util";

class PlutonicationWalletClient {
  private socket: Socket | null = null;
  private roomKey = "";
  private keyring: Keyring;

  constructor(private accessCredentials: AccessCredentials) {
    this.roomKey = accessCredentials.key;
    this.socket = io(accessCredentials.url);
    
    this.keyring = new Keyring({ type: "sr25519" });
  }

  public initialize(): void{
    void new Promise<void>((resolve) => {
      this.socket?.on("connect", () => {
        console.log("Connected to Plutonication Server");
        resolve();
      });
    });

    this.socket?.on("message", function (data) {
      console.log("Received message:", data);
    });

    // Escuchar solicitud de firma desde la DApp
    this.socket?.on("sign_payload", (payload: string) => {
      console.log("Received sign payload request:", payload);
    });

    // Escuchar solicitud de firma desde la DApp
    this.socket?.on("sign_raw", (payload: string) => {
      console.log("Received sign payload request:", payload);
    });
  }

  public  sendSignedPayload(payloadSignature: string): void {
    if (this.socket) {
      this.socket.emit("payload_signature", {
        Data: payloadSignature,
        Room: this.roomKey,
      });
    }
  }

  public sendSignedRaw(rawMessage: string): void {
    if (this.socket) {
      this.socket.emit("raw_signature", {
        Data: rawMessage,
        Room: this.roomKey,
      });
    }
  }

  public  sendPublicKey(publicKey: string): void {
    if (this.socket) {
      console.log("Sending public key: ", publicKey);
      this.socket.emit("pubkey", { Data: publicKey, Room: this.roomKey });
    }
  }

  public async createNewAccount(): Promise<{ pubKeySS58Format: string; signature: string }> {
    await cryptoWaitReady();
  
    // Generate the menmonic
    const mnemonic = mnemonicGenerate();
    const account = this.keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
    const publicKey = account.publicKey;
    const pubKeySS58Format = encodeAddress(publicKey, 42);
  
    console.log(this.keyring.pairs.length, "pairs available");
    console.log(account.meta.name, "has address", account.address);
  
    // create an ed25519 pair from the mnemonic
    const ep = this.keyring.createFromUri(mnemonic, { name: "ed25519" }, "ed25519");
  
    // create an sr25519 pair from the mnemonic (keyring defaults)
    const sp = this.keyring.createFromUri(mnemonic, { name: "sr25519" });
  
    // log the addresses, different cryptos, different results
    console.log(ep.meta.name, " : ", ep.address);
    console.log(sp.meta.name, " : ", sp.address);
  
    // create the message, actual signature and verify
    const message = stringToU8a("this is our message");
    const signature = account.sign(message);
    const isValid = account.verify(message, signature, account.publicKey);
  
    console.log(`${u8aToHex(signature)} is ${isValid ? "valid" : "invalid"}`);
  
    // // Emit the public key to the DApp via a socket event
    // this.sendPublicKey(pubKeySS58Format);
    // // Emit the payload to the DApp via socket event
    // this.sendSignedPayload(signature.toString());
    // // Emit the payloadRaw to the DApp via socket event
    // this.sendSignedRaw(signature.toString());
  
    return { pubKeySS58Format, signature: signature.toString() };
  }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

const walletClient = new PlutonicationWalletClient(accessCredentials);

// Realizar operaciones relacionadas con la billetera
void (async (): Promise<void> => {
  try {
    // Inicializar la conexión y otros procesos asincrónicos
    walletClient.initialize();
    const newAccount = await walletClient.createNewAccount();
    walletClient.sendPublicKey(newAccount.pubKeySS58Format);
    walletClient.sendSignedPayload(newAccount.signature.toString());
    walletClient.sendSignedRaw(newAccount.signature.toString());
  } catch (error) {
    console.error("Error:", error);
  }
})();