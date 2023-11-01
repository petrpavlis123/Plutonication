import { Socket, io } from "socket.io-client";
import { AccessCredentials } from "./AccesCredentials";
import { ApiPromise, WsProvider } from "@polkadot/api";
class PlutonicationDAppClient {
  
  private static client: Socket | null = null;
  private static roomKey: string = "";
  private static publicKey: string = "";
  private static substrateClient: ApiPromise | null = null;

  public static async InitializeAsync(
    ac: AccessCredentials,
    receivePublicKey: (pubkey: string) => void,
    // substrateClient: ApiPromise
  ): Promise<void> {
    if (!this.substrateClient) {
      const provider = new WsProvider("wss://rpc.polkadot.io");
      this.substrateClient = await ApiPromise.create({ provider });
      // Retrieve the chain & node information information via rpc calls
      // const [chain, nodeName, nodeVersion] = await Promise.all([
      //   this.substrateClient.rpc.system.chain(),
      //   this.substrateClient.rpc.system.name(),
      //   this.substrateClient.rpc.system.version()
      // ]);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    }

    this.client = io(ac.url);
    this.roomKey = ac.key;

    // this.client.on("receivepubkey",  (data) => {
    //   this.publicKey = data as string;
    // });
    this.client.on("receivepubkey", (publicKeyJson: string) => {
      console.log("Received publicKeyJson:", publicKeyJson);
    
      try {
        const parsedData = JSON.parse(publicKeyJson) as string;
        console.log("Parsed data:", parsedData);
    
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          const pubkey = parsedData[0] as string;
          console.log("Public Key:", pubkey);
          this.publicKey = pubkey;
          receivePublicKey(pubkey);
        } else {
          console.log("No pub keyyyyyyyy");
        }
      } catch (error) {
        console.error("Error al analizar PublicKey JSON:", error);
      }
    });

    // Listen to an event
    this.client.on("message", function (data) {
      console.log(data);
    });

    // this.client.on("connect", () => {
    //   console.log("Connected to Plutonication server");
    // });
    
    this.client.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    this.client.connect();
    this.client.emit("create_room", { Data: "Nothing here", Room: this.roomKey });
    // console.log("Plutonication connected");

  }


}

// Using it
const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  AccessCredentials.GenerateKey(),
  "Galaxy Logic Game", 
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);
void PlutonicationDAppClient.InitializeAsync(
  {
    url: accessCredentials.url,
    key: accessCredentials.key,
    name: accessCredentials.name,
    icon: accessCredentials.icon,
    ToUri: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  (pubkey) => {
    console.log("Public Key:", pubkey);
  }
);