/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/require-await */
import { ApiPromise, WsProvider } from "@polkadot/api";

import { AccessCredentials } from "./AccesCredentials";
import { Socket, io } from "socket.io-client";
import type { Injected, InjectedAccount, Unsubcall } from '@polkadot/extension-inject/types';
import type { SignerPayloadJSON, SignerPayloadRaw  } from '@polkadot/types/types';
import type { SignerResult } from '@polkadot/api/types/index.js';
import type { HexString } from "@polkadot/util/types";
// import * as qrcode from "qrcode";
// import * as fs from "fs";

export interface Transaction {
  to: string,
  amount: number
}

let signature: HexString = "0x";
async function waitForSignature(): Promise<HexString> {
  signature = "0x";
  while (signature === "0x") {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return signature;
}
class PlutonicationDAppClient {
  private static socket: Socket;
  private static pubKey: string;
  private static qrUri: string | Buffer;

  // constructor() {

  // }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get: async (_anyType?: boolean | undefined): Promise<InjectedAccount[]> => {
              const account: InjectedAccount = {
                address: this.pubKey
              };
      
              return [account];
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

        // wallet sign a payload
        this.socket.on("payload_signature", (data: SignerResult) => {
          console.log("signed_payload: ", data);
          signature = data.signature;
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
      console.log("REALIZANDO EXTRINSIC");
      const transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);
  
      transferExtrinsic.signAndSend(sender, { signer: signer }, ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }).catch((error: unknown) => {
        console.log(':( transaction failed', error);
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

const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

const transactionDetails: Transaction = {
  to: '5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ',
  amount: 1000 * 10**12,
};

// void PlutonicationDAppClient.InitializeAsync(
//   accessCredentials,
//   (pubkey) => {
//     console.log("Pubkey recibida:", pubkey);
//   }
// );

const execute = async ():Promise<void> => {
  await PlutonicationDAppClient.SendPayloadAsync(accessCredentials, transactionDetails);
  // await PlutonicationDAppClient.InitializeAsync(accessCredentials, async (pubKey) => {
  //   console.log("Pubkey recibida:", pubKey);
  //   const transactionDetails: Transaction = {
  //     to: '5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ',
  //     amount: 1000,
  //   };
  
  //   await PlutonicationDAppClient.SendPayloadAsync(accessCredentials, transactionDetails);
  // });
};

void execute();
