// @packages
import { Socket, io } from "socket.io-client";
import { AccessCredentials } from "./AccesCredentials";
import { Keyring } from "@polkadot/keyring";

class PlutonicationWalletClient {
  private socket: Socket | null = null;
  private roomKey = "";
  private keyring: Keyring;

  constructor(private accessCredentials: AccessCredentials) {
    this.roomKey = accessCredentials.key;
    this.socket = io(accessCredentials.url);
    
    this.keyring = new Keyring({ type: "sr25519" });
  }

  public async initializeAsync(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.socket?.on("connect", () => {
        console.log("Connected to Plutonication Server");

      });

      this.socket?.on("message", function (data) {
        console.log("Received message:", data);
      });

      // Listen dapp request to sign
      this.socket?.on("sign_payload", (payload: string) => {
        console.log("Received sign payload request:", payload);
      });

      // Listen dapp request to sign
      this.socket?.on("sign_raw", (payload: string) => {
        console.log("Received sign payload request:", payload);
      });

      resolve();
    });
  }

  public async sendPublicKeyAsync(publicKey: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.socket) {
        console.log("Sending public key: ", publicKey);
        this.socket.emit("pubkey", { Data: publicKey, Room: this.roomKey });
        resolve();
      }
    });
  }

  public async sendSignedPayloadAsync(payloadSignature: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.socket) {
        this.socket.emit("payload_signature", {
          Data: payloadSignature,
          Room: this.roomKey,
        });
        resolve();
      }
    });
  }

  public async sendSignedRawAsync(rawMessage: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.socket) {
        this.socket.emit("raw_signature", {
          Data: rawMessage,
          Room: this.roomKey,
        });
        resolve();
      }
    });
  }

  // public initialize(): void{
  //   void new Promise<void>((resolve) => {
  //     this.socket?.on("connect", () => {
  //       console.log("Connected to Plutonication Server");
  //       resolve();
  //     });
  //   });

  //   this.socket?.on("message", function (data) {
  //     console.log("Received message:", data);
  //   });

  //   // Escuchar solicitud de firma desde la DApp
  //   this.socket?.on("sign_payload", (payload: string) => {
  //     console.log("Received sign payload request:", payload);
  //   });

  //   // Escuchar solicitud de firma desde la DApp
  //   this.socket?.on("sign_raw", (payload: string) => {
  //     console.log("Received sign payload request:", payload);
  //   });
  // }

  // public  sendSignedPayload(payloadSignature: string): void {
  //   if (this.socket) {
  //     this.socket.emit("payload_signature", {
  //       Data: payloadSignature,
  //       Room: this.roomKey,
  //     });
  //   }
  // }

  // public sendSignedRaw(rawMessage: string): void {
  //   if (this.socket) {
  //     this.socket.emit("raw_signature", {
  //       Data: rawMessage,
  //       Room: this.roomKey,
  //     });
  //   }
  // }

  // public  sendPublicKey(publicKey: string): void {
  //   if (this.socket) {
  //     console.log("Sending public key: ", publicKey);
  //     this.socket.emit("pubkey", { Data: publicKey, Room: this.roomKey });
  //   }
  // }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

export { PlutonicationWalletClient };


