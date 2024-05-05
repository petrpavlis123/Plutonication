import { io } from "socket.io-client";
import { AccessCredentials } from "./AccessCredentials";
import type { SignerResult} from "@polkadot/api/types/index.js"
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types"

interface PlutonicationWallet {
  sendPayloadSignature: (signature: SignerResult) => void
  sendRawSignature: (singature: SignerResult) => void
  disconnect: () => void
}

/**
 * Handles communication with the Plutonication server, sending and receiving payloads and raw signatures.
 * @param {AccessCredentials} accessCredentials - The credentials required for connecting to the Plutonication server.
 * @param {string} pubkey - The public key associated with the wallet.
 * @param {(payload: SignerPayloadJSON) => Promise<void>} onSignPayload - Callback function to handle payload signing.
 * @param {(raw: SignerPayloadRaw) => Promise<void>} onSignRaw - Callback function to handle raw signing.
 * @returns A Promise resolving to the initialized Plutonication wallet client.
 */
export async function initializePlutonicationWalletClient(
  accessCredentials: AccessCredentials,
  pubkey: string,
  onSignPayload: (payload: SignerPayloadJSON) => Promise<void>,
  onSignRaw: (raw: SignerPayloadRaw) => Promise<void>,
): Promise<PlutonicationWallet> {

  const socket = io(accessCredentials.url)

  // used for debugging
  socket.on("message", (data) => {
    console.log("Received message:", data)
  })

  // On sign_payload
  socket.on("sign_payload", async (receivedPayload: SignerPayloadJSON) => {
    await onSignPayload(receivedPayload)
  })

  // On sign_raw
  socket.on("sign_raw", async (receivedRaw: SignerPayloadRaw) => {
    await onSignRaw(receivedRaw)
  })

  // Wait for the Wallet socket client to connect.
  await new Promise<void>((resolve) => {
    socket.on("connect", () => {
      console.log("Wallet connected")

      resolve()
    })
  })

  // Join the room and expose the pubkey
  socket.emit("pubkey", { Data: pubkey, Room: accessCredentials.key })

  return {
    sendPayloadSignature(signerResult: SignerResult): void {
      socket.emit("payload_signature", { Data: signerResult, Room: accessCredentials.key });
    },
    sendRawSignature(signerResult: SignerResult): void {
      socket.emit("raw_signature", { Data: signerResult, Room: accessCredentials.key } );
    },
    disconnect(): void {
      socket.emit("disconnect");
    }
  }
}
