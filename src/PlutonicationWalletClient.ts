import { Socket, io } from "socket.io-client";
import { AccessCredentials } from "./AccesCredentials";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady, mnemonicGenerate, encodeAddress, decodeAddress } from "@polkadot/util-crypto";
import type { SignerResult } from "@polkadot/api/types";
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { ApiPromise, WsProvider } from "@polkadot/api";
import bs58 from "bs58";
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

    // this.socket?.on("pubkey", (pubkey: string) => {
    //   console.log("Wallet public key:", pubkey);
    // });

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

  public  sendPublicKey(publicKey: string): void {
    if (this.socket) {
      console.log("Sending public key: ", publicKey);
      this.socket.emit("pubkey", { Data: publicKey, Room: this.roomKey });
    }
  }


  public  async createNewAccount(): Promise<void>{
    
    const provider = new WsProvider("wss://ws.test.azero.dev");
    const api = await ApiPromise.create({ provider });

    const block = await api.rpc.chain.getBlock();
    const blockHash = block.block.header.hash.toHex();
    const blockNumber = block.block.header.number.toHex();
    const runtimeVersion = await api.rpc.state.getRuntimeVersion();
    const transactionVersion = await api.rpc.chain.getFinalizedHead();
    const genesisHash = api.genesisHash.toHex();

    await cryptoWaitReady();

    // Generate the menmonic
    const mnemonic = mnemonicGenerate();
    const account = this.keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
    const publicKey = account.publicKey;
    const pubKeySS58Format = encodeAddress(publicKey, 42);
    console.log("Clave pública en formato base58:", pubKeySS58Format);
    
    
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

    console.log(`${u8aToHex(signature)} is ${isValid ? "valid" : "invalid"}`);
    
    const payloadJson: SignerPayloadJSON = {
      address: account.address,
      blockHash: blockHash,
      blockNumber: blockNumber,
      era: "0x00", // Falta obtenerlo a través de la api
      genesisHash: genesisHash,
      method: "0x0000", // Falta obtenerlo a través de la api
      nonce: "0x0000", // Falta obtenerlo a través de la api
      specVersion: runtimeVersion.specVersion.toHex(),
      tip: "0x00000000000000000000000000000000", // Falta obtenerlo a través de la api
      transactionVersion: transactionVersion.toHex(),
      signedExtensions: [], // Falta obtenerlo a través de la api
      version: 1, // Falta obtenerlo a través de la api
    };
    console.log("Transaction Details:", payloadJson);

    const payloadRaw: SignerPayloadRaw = {
      address: account.address,
      type: "payload",
      data: ""
    };

    // Emit the public key to the DApp via a socket event
    this.sendPublicKey(pubKeySS58Format);
    // Emit the address to the DApp via socket event
    this.sendAddress(account.address);
    // Emit the payload to the DApp via socket event
    this.sendSignedPayloadAsync(payloadJson);
    // Emit the payloadRaw to the DApp via socket event
    this.sendSignedRawAsync(payloadRaw);
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
void walletClient.createNewAccount();
