
import { injectExtension } from '@polkadot/extension-inject';

import type { Injected } from '@polkadot/extension-inject/types';

import { AccessCredentials, initializePlutonicationDAppClientWithModal } from '@plutonication/plutonication';

const plutonicationUrl = "wss://plutonication-acnha.ondigitalocean.app" // "ws://0.0.0.0:8050/plutonication" 

function inject() {
  injectExtension(enable, {
    // We use polkadot-js for compatibility
    name: 'polkadot-js',
    version: "1.0.0"
  });
}

async function getFavicon(): Promise<string> {
  try {
    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      return tab.favIconUrl || "https://plutonication.com/wallets/plutowalletblack";
    });
  }
  finally {
    return "https://plutonication.com/wallets/plutowalletblack";
  }
}

export async function enable(origin: string): Promise<Injected> {
  const faviconUrl = await getFavicon()

  return await initializePlutonicationDAppClientWithModal(
    new AccessCredentials(
      plutonicationUrl,
      origin,
      faviconUrl,
    )
  )
}

inject()
