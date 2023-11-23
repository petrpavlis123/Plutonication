/* eslint-disable @typescript-eslint/no-unused-vars */
// @packages
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Socket, io } from "socket.io-client";
import type { Injected, InjectedAccount, Unsubcall } from "@polkadot/extension-inject/types";
import type { SignerPayloadJSON, SignerPayloadRaw  } from "@polkadot/types/types";
import type { SignerResult } from "@polkadot/api/types/index.js";

// @scripts
import { Transaction } from "./interfaces/transaction.interface";
import { AccessCredentials } from "./AccesCredentials";
import { waitForSignature } from "./helpers.ts/waitForSignature";

class PlutonicationDAppClient {
  private socket: Socket | null;
  public pubKey: string | null;
  private signature: string | null;
  private injector: Injected | undefined;

  constructor() {
    this.socket = null;
    this.pubKey = null;
    this.signature = null;
    this.injector = undefined;
  }
  
  async initializeAsync(accessCredentials: AccessCredentials): Promise<Injected> {
    try {
      this.socket = io(accessCredentials.url);

      this.socket.on("connect", () => {
        console.log("Connected!");
        this.socket!.emit("create_room", { Data: "Nothing", Room: accessCredentials.key});
      });

      this.socket.on("message", function (data) {
        console.log("Received message:", data);
      });

      this.pubKey = await new Promise((resolve, reject) => {
        this.socket!.on("pubkey", (pubkey: string) => {
          console.log("Received pubkey:", pubkey);
          resolve(pubkey);
        });

        this.socket!.on("connect_error", (error: Error) => {
          reject(new Error(`Connection error: ${error.message}`));
        });
      });

      this.injector = this.createInjected(this.pubKey || "", this.socket, accessCredentials);
      return this.injector;
    } catch (error) {
      console.error("Error during initialization:", error);
      throw error;
    }
  }

  private createInjected(pubKey: string, socket: Socket, accessCredentials: AccessCredentials): Injected {
    return {
      accounts: {
        // eslint-disable-next-line @typescript-eslint/require-await
        async get(_anyType?: boolean): Promise<InjectedAccount[]> {
          return [{ address: pubKey }];
        },
        subscribe(_cb: (accounts: InjectedAccount[]) => void | Promise<void>): () => void {
          return () => {};
        },
      },
      signer: {
        async signPayload(payloadJson: SignerPayloadJSON): Promise<SignerResult> {
          // requesting signature from wallet
          socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
          const signature = await waitForSignature();
          return { id: 0, signature };
        },
        async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
          // requesting signature from wallet
          socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
          const signature = await waitForSignature();
          return { id: 0, signature };
        },
      },
    };
  }

  async sendPayloadAsync(transactionDetails: Transaction): Promise<void> {
    try {
      if (!this.injector || !this.pubKey) {
        throw new Error("Please call initializeAsync first.");
      }

      const provider = new WsProvider("wss://ws.test.azero.dev");
      const api = await ApiPromise.create({ provider });

      const signer = this.injector.signer;
      const sender = this.pubKey;
      const transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);

      await transferExtrinsic.signAndSend(sender, { signer: signer }, ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }).catch((error: unknown) => {
        console.log(":( transaction failed", error);
      });
    } catch (error) {
      console.error("Error during payload sending:", error);
      throw error;
    }
  }

  generateQR(accessCredentials: AccessCredentials): string {
    const uriQr = accessCredentials.ToUri();
    return uriQr;
  }
}

export { PlutonicationDAppClient };

// const accessCredentials = new AccessCredentials(
//   "wss://plutonication-acnha.ondigitalocean.app/",
//   "1",
//   "Galaxy Logic Game",
//   "https://rostislavlitovkin.pythonanywhere.com/logo"
// );

// const transactionDetails: Transaction = {
//   to: "5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ",
//   amount: 1000 * 10 ** 12,
// };

// void (async (): Promise<void> => {
//   const dappClient = new PlutonicationDAppClient();
//   console.log("instanciando mi dapp");
//   try {
//     const injected: Injected = await dappClient.initializeAsync(accessCredentials);
//     console.log("Injected:", injected);

//     await dappClient.sendPayloadAsync(transactionDetails);
//   } catch (error) {
//     console.error("Error in main flow:", error);
//   }
// })();