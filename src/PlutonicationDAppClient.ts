import { io } from "socket.io-client"
import type { Injected, InjectedAccount, InjectedWindow } from "@polkadot/extension-inject/types"
import type { SignerPayloadJSON, SignerPayloadRaw } from "@polkadot/types/types"
import type { SignerResult } from "@polkadot/api/types/index.js"
import { AccessCredentials } from "./AccessCredentials"
import { PlutonicationModal } from "./components/PlutonicationModal"

export interface PlutonicationInjected extends Injected {
  disconnect: () => void
}

/**
 * Initializes the Plutonication DApp client connection.
 * @param {AccessCredentials} accessCredentials - The credentials required for connecting to the Plutonication server.
 * @param {(receivedPubkey: string) => void} onReceivePubkey - Callback function to handle the received public key.
 * @returns A Promise resolving to the initialized Plutonication Injected account.
 */
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

  const injected: PlutonicationInjected = {
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

  const win = window as Window & InjectedWindow;

  win.injectedWeb3 = {
    'plutonication': {
      version: '1.0.0',
      enable: async (_originName: string) => injected,
    }
  };
  
  return injected
}

/**
 * Shows the modal's QR code and handles the connection with the Plutonication server.
 * @param {AccessCredentials} accessCredentials - The credentials required for connecting to the Plutonication server.
 * @param {(receivedPubkey: string) => void} onReceivePubkey - Callback function to handle the received public key.
 * @returns A Promise resolving to the initialized Plutonication Injected account.
 * @throws Throws an error if no or multiple PlutonicationModal components are found in the DOM.
 */
export async function initializePlutonicationDAppClientWithModal(
  accessCredentials: AccessCredentials,
  onReceivePubkey: (receivedPubkey: string) => void,
): Promise<PlutonicationInjected> {

  // Show Plutonication modal QR code
  const modal = getPlutonicationModal()

  modal.openModal(accessCredentials)

  // Return the initialized Plutonication Injected account
  return await initializePlutonicationDAppClient(
    accessCredentials,
    (receivedPubkey: string): void => {

      // Hide Plutonication modal
      modal.closeModal()

      onReceivePubkey(receivedPubkey)
    }
  )
}

/**
 * Retrieves the PlutonicationModal web component from the DOM.
 * @returns The PlutonicationModal web component.
 * @throws Throws an error if no or multiple PlutonicationModal components are found in the DOM.
 */
function getPlutonicationModal(): PlutonicationModal {
  const plutonicationModals = document.getElementsByTagName('plutonication-modal')

  if (plutonicationModals.length == 0) {
    throw new Error(`You have not included any Plutonication modal.
    Please include <plutonication-modal></plutonication-modal> in your HTML code.`)
  }

  if (plutonicationModals.length != 1) {
    console.warn(`You have included too many Plutonication modals.
      Please remove some of the <plutonication-modal></plutonication-modal>  in your HTML code to improve performance.
      \n
      In rare cases, this may cause the modal to not appear as you want to.
    `)
  }

  return plutonicationModals[0] as PlutonicationModal;
}