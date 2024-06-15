import { io } from "socket.io-client";
import { AccessCredentials } from "./AccessCredentials";
import type { SignerResult } from "@polkadot/api/types"
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types"

export interface PlutonicationWallet {
  /**
   * Sends payload's signature to the dApp.
   * @param signature payload's signature
   * @returns Promise<void>
   */
  sendPayloadSignature: (signature: SignerResult) => void

  /**
   * Sends raw message's signature to the dApp.
   * @param singature raw message's signature
   * @returns Promise<void>
   */
  sendRawSignature: (singature: SignerResult) => void

  /**
   * Disconnects from the Plutonication server.
   * @returns Promise<void>
   */
  disconnect: () => Promise<void>
}

/**
 * Handles communication with the Plutonication server, sending and receiving payloads and raw signatures.
 * @param {AccessCredentials} accessCredentials - The credentials required for connecting to the Plutonication server.
 * @param {string} pubkey - The public key associated with the wallet.
 * @param {(payload: SignerPayloadJSON) => Promise<void>} onSignPayload - Callback function to handle payload signing.
 * @param {(raw: SignerPayloadRaw) => Promise<void>} onSignRaw - Callback function to handle raw signing.
 * @param {() => void} onConnected - Optional callback function to handle the successful Connection to the Plutonication Server.
 * @param {() => void} onConfirmDAppConnection - Optional callback function to handle the confirmation of the dApp connection to the Plutonication Server.
 * @param {() => void} onDAppDisconnected - Optional callback function to handle the disconnection of the respective dApp.
 * @returns A Promise resolving to the initialized Plutonication wallet client.
 */
export async function initializePlutonicationWalletClient(
  accessCredentials: AccessCredentials,
  pubkey: string,
  onSignPayload: (payload: SignerPayloadJSON) => Promise<void>,
  onSignRaw: (raw: SignerPayloadRaw) => Promise<void>,
  onConnected?: () => void,
  onConfirmDAppConnection?: () => void,
  onDAppDisconnected?: () => void,
): Promise<PlutonicationWallet> {

  const socket = io(accessCredentials.url)
  const roomKey = accessCredentials.key

  // On sign_payload
  socket.on("sign_payload", onSignPayload)

  // On sign_raw
  socket.on("sign_raw", onSignRaw)

  // Handle the scenario where dApp connects after the Wallet.
  socket.on("dapp_connected", () => {
    // Send the pubkey again to the newly connected dApp
    socket.emit("connect_wallet", { Data: pubkey, Room: roomKey })
  })

  // Confirm dApp connection
  socket.on("confirm_dapp_connection", onConfirmDAppConnection)

  //  Handle the dApp disconnection
  socket.on("disconnect", onDAppDisconnected)

  // Wait for the Wallet socket client to connect.
  await new Promise<void>((resolve) => {
    socket.on("connect", resolve)
  })

  // Join the room and expose the pubkey
  socket.emit("connect_wallet", { Data: pubkey, Room: roomKey })

  if (onConnected) onConnected()

  return {
    async sendPayloadSignature(signerResult: SignerResult): Promise<void> {
      await socket.emit("payload_signature", { Data: signerResult, Room: roomKey });
    },
    async sendRawSignature(signerResult: SignerResult): Promise<void> {
      await socket.emit("raw_signature", { Data: signerResult, Room: roomKey });
    },
    async disconnect(): Promise<void> {
      socket.removeAllListeners()

      await socket.disconnect()
    }
  }
}
