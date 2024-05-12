import QRCode from 'qrcode';
import '@polkadot/extension-inject/crossenv';

// import type { RequestSignatures, TransportRequestMessage } from '@polkadot/extension-base/background/types';

import { injectExtension } from '@polkadot/extension-inject';
import type { Injected } from '@polkadot/extension-inject/types';
// import type { Message } from '@polkadot/extension-base/types';
// import { MESSAGE_ORIGIN_CONTENT } from '@polkadot/extension-base/defaults';
// import { handleResponse, redirectIfPhishing } from '@polkadot/extension-base/page';

import { AccessCredentials, initializePlutonicationDAppClient, initializePlutonicationDAppClientWithModal, initializePlutonicationDAppClientWithModalForExtension } from "@plutonication/plutonication";
import { packageInfo } from '@polkadot/util';

declare global {
    interface Window {
        downloadWallet: (platform: string,  downloadLinks: { android: string; ios: string; }) => void;
    }
}
document.addEventListener('DOMContentLoaded', async() => {
    const extensionContent = document.getElementsByTagName('main')[0];
    extensionContent.style.width = "350px";
    extensionContent.style.height = "460px";

    // const modal = document.querySelector(".plutonication__component") as HTMLElement;

    initialize();
});

let account; // This is the Injected account object that will connect via Plutonication

async function initialize() {
  const accessCredentials = new AccessCredentials(
    "wss://plutonication-acnha.ondigitalocean.app/",
    "Plutonication test",
    "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
  );

  console.log("accessCredentials:", accessCredentials.ToUri());

  account = await initializePlutonicationDAppClientWithModalForExtension(
    accessCredentials,
    (receivedPubkey) => {
      console.log("receivedPubkey", receivedPubkey);
    }
  );

  console.log("injected", account);
}




