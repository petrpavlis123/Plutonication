/* eslint-disable @typescript-eslint/require-await */
import { WsProvider } from "@polkadot/api";
import { AccessCredentials } from "./AccesCredentials";
import { Socket, io } from "socket.io-client";

class PlutonicationDAppClient {
  private static socket: Socket;

  // constructor() {
    
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static async InitializeAsync(accessCredentials: AccessCredentials, callback: (pubkey: string) => void, substrateClient: WsProvider): Promise<void> {
    
    this.socket = io(accessCredentials.url);

    this.socket.on("connect", () => {
      console.log("Connected to ", this.socket);
    });

    this.socket.on("message", function (data) {
      console.log("Received message:", data);
    });

    this.socket.emit("access_credentials", accessCredentials);
    
    this.socket.on("pubkey", (pubkey: string) => {
      callback(pubkey);
    });
  }

  public static async SendPayloadAsync(collectionId: number, itemId: number, parameters: number[]) : Promise<void> {
    this.socket.emit("send_payload", { collectionId, itemId, parameters });
  }


}

export { PlutonicationDAppClient };

const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "5FQtFhSYHyGggu9NZJiHyjUvoCuJxJoHkBLRfwQemPYzg41V",
  "Galaxy Logic Game", 
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);


const substrateClient = new WsProvider("wss://rpc.polkadot.io");

void PlutonicationDAppClient.InitializeAsync(
  accessCredentials,
  (pubkey) => {
    console.log("Pubkey recibida:", pubkey);
  },
  substrateClient
);

