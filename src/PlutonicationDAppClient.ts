/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/require-await */
import { ApiPromise, WsProvider } from "@polkadot/api";

import { AccessCredentials } from "./AccesCredentials";
import { Socket, io } from "socket.io-client";
import type { Injected, InjectedAccount, Unsubcall } from '@polkadot/extension-inject/types';
import type { SignerPayloadJSON } from '@polkadot/types/types';
import type { SignerResult } from '@polkadot/api/types/index.js';
import type { HexString } from "@polkadot/util/types";
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
            // signRaw: async (raw: SignerPayloadRaw): Promise<SignerResult> => {
            // }
          }
        };
        this.socket.on("payload_signature", (signature: string) => {
          console.log("Received signature:", signature);
        });
        resolve(injected);
      });
    });
  }
  
  public static async SendPayloadAsync(accessCredentials: AccessCredentials, transactionDetails: Transaction): Promise<void> {
    try {
      const injector = await PlutonicationDAppClient.InitializeAsync(accessCredentials, pubKey =>  console.log(pubKey));
      console.log("injector", injector);
  
      const provider = new WsProvider("wss://ws.test.azero.dev");
      const api = await ApiPromise.create({ provider });
      // Do something
      console.log("apiGenesis", api.genesisHash.toHex());
      const signer = injector.signer;
      const sender = this.pubKey;
      // console.log("igner, sender", signer, sender);
  
      const transferExtrinsic = api.tx.balances.transfer(transactionDetails.to, transactionDetails.amount);
      // console.log("transferExtrinsic", transferExtrinsic);
  
      transferExtrinsic.signAndSend(sender, { signer: signer }, ({ status }) => {
        console.log("status", status);
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
  amount: 1000,
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
