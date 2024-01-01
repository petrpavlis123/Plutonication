/* eslint-disable @typescript-eslint/no-unused-vars */
// @packages
import { io } from "socket.io-client"
import type { Injected, InjectedAccount } from "@polkadot/extension-inject/types"
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types"
import type { SignerResult} from "@polkadot/api/types/index.js"
import { AccessCredentials } from "./AccessCredentials"

export interface PlutonicationInjected extends Injected {
  disconnect: () => void
}

export async function initializePlutonicationDAppClient(
  accessCredentials: AccessCredentials,
  onReceivePubkey: (receivedPubkey: string) => void,
): Promise<PlutonicationInjected> {

  // Connect to the web socket
  const socket = io(accessCredentials.url)

  // Used for debugging
  socket.on("message", (data) => {
    console.log("Plutonication received message:", data)
  })

  // Wait for the dApp socket client to connect.
  await new Promise<void>((resolve) => {
    socket.on("connect", () => {
      resolve()
    })
  })

  // Create the room
  socket.emit("create_room", { Room: accessCredentials.key })

  // Wait for the wallet.
  // It needs to send to pubkey to this dApp client.
  const pubkey = await new Promise<string>((resolve) => {
    socket.on("pubkey", (receivedPubkey: string) => {
      onReceivePubkey(receivedPubkey)

      resolve(receivedPubkey)
    })
  })

  // Return the Injected account
  return {
    accounts: {
      // eslint-disable-next-line @typescript-eslint/require-await
      async get(_anyType?: boolean): Promise<InjectedAccount[]> {
        return [{ address: pubkey }]
      },
      subscribe(_cb: (accounts: InjectedAccount[]) => void | Promise<void>): () => void {
        return () => { }
      },
    },
    
    signer: {
      async signPayload(payloadJson: SignerPayloadJSON): Promise<SignerResult> {

        // requesting signature from wallet
        socket.emit("sign_payload", { Data: payloadJson, Room: accessCredentials.key })
        const signerResult = await new Promise<SignerResult>((resolve) => {
          socket.on("payload_signature", (receivedPayloadSignature: SignerResult) => {

            resolve(receivedPayloadSignature)
          })
        })

        return signerResult
      },
      async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {
        // requesting signature from wallet
        socket.emit("sign_raw", { Data: raw, Room: accessCredentials.key })
        const signerResult = await new Promise<SignerResult>((resolve) => {
          socket.on("raw_signature", (receivedPayloadSignature: SignerResult) => {

            resolve(receivedPayloadSignature)
          })
        })

        return signerResult
      },
    },

    disconnect(): void {
      socket.emit("disconnect");
    }
  }
}