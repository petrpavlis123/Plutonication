/* eslint-disable @typescript-eslint/no-unused-vars */
// @packages
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Socket, io } from "socket.io-client";
import type { Injected, InjectedAccount, Unsubcall } from "@polkadot/extension-inject/types";
import type { SignerPayloadJSON, SignerPayloadRaw  } from "@polkadot/types/types";
import type { SignerResult } from "@polkadot/api/types/index.js";

// @scripts
import { AccessCredentials } from "./AccesCredentials";
import { waitForSignature } from "./helpers.ts/waitForSignature";

class PlutonicationDAppClient {
  private socket: Socket;
  private pubKey: string | null = null;
  private injector: Injected | undefined;

  constructor(private accessCredentials: AccessCredentials) {
    this.socket = io(this.accessCredentials.url);
    this.initialize();
  }

  private initialize(): void {
    this.socket?.on("connect", () => {
      console.log("Connected!");
      this.socket?.emit("create_room", { Data: "Nothing", Room: this.accessCredentials.key });
    });

    this.socket?.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Listen for payload signature from wallet
    this.socket?.on("payload_signature", (signature: string) => {
      console.log("Received payload signature:", signature);
    });

    // Listen for raw signature from wallet
    this.socket?.on("raw_signature", (signature: string) => {
      console.log("Received raw signature:", signature);
    });
  }

  public async initializeAsync(): Promise<Injected> {
    try {
      this.pubKey = await new Promise<string>((resolve, reject) => {
        this.socket?.on("pubkey", (pubkey: string) => {
          console.log("Received pubkey:", pubkey);
          resolve(pubkey);
        });

        this.socket?.on("connect_error", (error: Error) => {
          reject(new Error(`Connection error: ${error.message}`));
        });
      });

      this.injector = this.createInjected(this.pubKey || "", this.socket, this.accessCredentials);
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

  async sendPayloadAsync(to: string, amount: number): Promise<void> {
    try {
      if (!this.injector || !this.pubKey) {
        throw new Error("Please call initializeAsync first.");
      }

      const provider = new WsProvider("wss://ws.test.azero.dev");
      const api = await ApiPromise.create({ provider });

      const signer = this.injector.signer;
      const sender = this.pubKey;
      const transferExtrinsic = api.tx.balances.transfer(to, amount);

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

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  generateQR(accessCredentials: AccessCredentials): string {
    const uriQr = accessCredentials.ToUri();
    return uriQr;
  }
}

export { PlutonicationDAppClient };

// Crear una instancia de AccessCredentials y PlutonicationDAppClient
const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

const dappClient = new PlutonicationDAppClient(accessCredentials);

// Iniciar la conexión e inicialización asincrónica
void (async (): Promise<void> => {
  try {
    // Inicializar la conexión y obtener la inyección de la extensión
    const injector = await dappClient.initializeAsync();

    // Verificar si se ha inicializado correctamente la extensión
    if (injector) {
      // Llamar a sendPayloadAsync para enviar una transacción
      const to = "5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ";
      const amount = 1000 * 10 ** 12;

      await dappClient.sendPayloadAsync(to, amount);
    } else {
      console.error("Error al inicializar la extensión");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();