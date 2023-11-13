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
  private static socket: Socket;
  private static pubKey: string;
  private static signature: string;
  private static qrUri: string | Buffer;
  
  public static async InitializeAsync(accessCredentials: AccessCredentials, callback: (pubkey: string) => void): Promise<Injected> {

    return new Promise<Injected>((resolve) => {
      this.socket = io(accessCredentials.url);
  
      this.socket.on("connect", () => {
        console.log("Connected!");
  
        this.socket.emit("create_room", { Data: "Nothing", Room: accessCredentials.key});
      });
  
      this.socket.on("message", function (data) {
        console.log("Received message:", data);
      });
  
      this.socket.on("pubkey", (pubkey: string) => {
        this.pubKey = pubkey;
        callback(pubkey);

        const injected: Injected = {
          accounts: {
            // eslint-disable-next-line @typescript-eslint/require-await
            get: async (_anyType?: boolean | undefined): Promise<InjectedAccount[]> => {
              const account: InjectedAccount = {
                address: this.pubKey
              };
      
              return [account];
            },
            subscribe: function (_cb: (accounts: InjectedAccount[]) => void | Promise<void>): Unsubcall {
              return () => { };
            }
          },
          signer: {
            signPayload: async (payloadJson: SignerPayloadJSON): Promise<SignerResult> => {
              // requesting signature from wallet
              this.socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key });
              const result: SignerResult = {
                /**
                 * @description The id for this request
                 */
                id: 0,
                /**
                 * @description The resulting signature in hex
                 */
                signature: await waitForSignature()
              };
              return result;
            },
            signRaw: async (raw: SignerPayloadRaw): Promise<SignerResult> => {
              // requesting signature from wallet
              this.socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key });
              const result: SignerResult = {
                /**
                 * @description The id for this request
                 */
                id: 0,
                /**
                 * @description The resulting signature in hex
                 */
                signature: await waitForSignature()
              };

              return result;
            }
          }
        };

        this.socket.on("payload_signature", (data: SignerResult) => {
          console.log("signed_payload: ", data);
          this.signature = data.signature;
        });
        
        this.socket.on("payload_signature_rejected", (errorData: unknown) => {
          console.error("Signature rejected:", errorData);
        });

        this.socket.on("raw_signature", (signature: string) => {
          console.log("signed_raw: ", signature);
        });

        this.socket.on("raw_signature_rejected", (errorData: unknown) => {
          console.error("Signature rejected:", errorData);
        });
        
        resolve(injected);
      });
    });
  }
  
  public static async SendPayloadAsync(accessCredentials: AccessCredentials, transactionDetails: Transaction): Promise<void> {
    try {
      const injector = await PlutonicationDAppClient.InitializeAsync(accessCredentials, pubKey =>  console.log(pubKey));
  
      const provider = new WsProvider("wss://ws.test.azero.dev");
      const api = await ApiPromise.create({ provider });
      const signer = injector.signer;
      const sender = this.pubKey;
      const transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);
  
      transferExtrinsic.signAndSend(sender, { signer: signer }, ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }).catch((error: unknown) => {
        console.log(":( transaction failed", error);
      });


    } catch (err) {
      console.error("Error:", err);
    }
  }

  public static generateQR(accessCredentials: AccessCredentials ): string {
    const uriQr = accessCredentials.ToUri();
    return uriQr;
  } 
}

export { PlutonicationDAppClient };