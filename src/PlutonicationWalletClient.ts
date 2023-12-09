import { Socket, io } from "socket.io-client";
import { AccessCredentials } from "./AccesCredentials";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady, mnemonicGenerate } from "@polkadot/util-crypto";
import type { SignerResult } from "@polkadot/api/types";
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { ApiPromise, WsProvider } from "@polkadot/api";

class PlutonicationWalletClient {
  private socket: Socket | null = null;
  private roomKey = "";
  private keyring: Keyring;

  constructor(private accessCredentials: AccessCredentials) {
    this.roomKey = accessCredentials.key;
    this.socket = io(accessCredentials.url);
    // Create a keyring instance
    this.keyring = new Keyring({ type: "sr25519" });
    this.initializeAsync();
  }

  private initializeAsync(): void{
    void new Promise<void>((resolve) => {
      this.socket?.on("connect", () => {
        console.log("Connected to Plutonication Server");
        resolve();
      });
    });

    this.socket?.on("message", function (data) {
      console.log("Received message:", data);
    });

    this.socket?.on("pubkey", (pubkey: string) => {
      console.log("Wallet public key:", pubkey);
    });

    this.socket?.on("payload_signature", (data: SignerResult) => {
      const signature = data.signature;
      console.log("Payload signature:", signature);
    });

    this.socket?.on("raw_signature", (data: SignerResult) => {
      const signature = data.signature;
      console.log("Raw signature:", signature);
    });
  }

  public sendAddress(address: string): void {
    if (!this.socket) return;
    this.socket.emit("address", { address, Room: this.roomKey });
  }

  public  sendSignedPayloadAsync(payload: SignerPayloadJSON): void {
    if (this.socket) {
      this.socket.emit("sign_payload", {
        Data: payload,
        Room: this.roomKey,
      });
    }
  }

  public sendSignedRawAsync(rawMessage: SignerPayloadRaw): void {
    if (this.socket) {
      this.socket.emit("sign_raw", {
        Data: rawMessage,
        Room: this.roomKey,
      });
    }
  }

  public  async createNewAccount(): Promise<void>{
    
    const provider = new WsProvider("wss://ws.test.azero.dev");
    const api = await ApiPromise.create({ provider });
    const blockNumber = (await api.rpc.chain.getBlockHash()).toHex();
    // const method = await api.rpc.
    // const nonce = await api.query.contracts.nonce.
    const genesisHash = api.genesisHash.toHex();
    // const runtimeVersion = await api.rpc.state.getRuntimeVersion();

    await cryptoWaitReady();

    // Generate the menmonic
    const mnemonic = mnemonicGenerate();
    const account = this.keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
    
    
    console.log(this.keyring.pairs.length, "pairs available");
    console.log(account.meta.name, "has address", account.address);
    console.log("PubKey: ", account.publicKey);

    // create an ed25519 pair from the mnemonic
    const ep = this.keyring.createFromUri(mnemonic, { name: "ed25519" }, "ed25519");

    // create an sr25519 pair from the mnemonic (keyring defaults)
    const sp = this.keyring.createFromUri(mnemonic, { name: "sr25519" });

    // log the addresses, different cryptos, different results
    console.log(ep.meta.name, " : ", ep.address);
    console.log(sp.meta.name, " : ",sp.address);

    // create the message, actual signature and verify
    const message = stringToU8a("this is our message");
    const signature = account.sign(message);
    const isValid = account.verify(message, signature, account.publicKey);
    // output the result
    console.log(`${u8aToHex(signature)} is ${isValid ? "valid" : "invalid"}`);
    
    // falta la tx
    const payloadJson: SignerPayloadJSON = {
      address: account.address,
      blockHash: genesisHash,
      blockNumber: blockNumber,
      era: "0x00", // Falta obtenerlo a través de la api
      genesisHash: genesisHash,
      method: "0x0000", // Falta obtenerlo a través de la api
      nonce: "0x0000", // Falta obtenerlo a través de la api
      specVersion: "0x0000", // Falta obtenerlo a través de la api
      tip: "0x00000000000000000000000000000000", // Falta obtenerlo a través de la api
      transactionVersion: "0x0000", // Falta obtenerlo a través de la api
      signedExtensions: [], // Falta obtenerlo a través de la api
      version: 1, // Falta obtenerlo a través de la api
    };

    const payloadRaw: SignerPayloadRaw = {
      address: account.address,
      type: "payload",
      data: ""
    };

    // Emit the address to the DApp via socket event
    this.sendAddress(account.address);

    this.sendSignedPayloadAsync(payloadJson);

    this.sendSignedRawAsync(payloadRaw);
  }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
}


const credentials: AccessCredentials = {
  url: "wss://plutonication-acnha.ondigitalocean.app/",
  key: "1",
  ToUri: function (): string {
    throw new Error("Function not implemented.");
  }
};

const walletClient = new PlutonicationWalletClient(credentials);
void walletClient.createNewAccount();
