// Copyright 2019-2023 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Runs in the extension background, handling all keyring access

/* global chrome */

import '@polkadot/extension-inject/crossenv';
let faviconUrl: string = ""

async function waitForFavicon(): Promise<string> {
  while (faviconUrl === "") {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return faviconUrl
}

chrome.runtime.onMessage.addListener(async function (request, _sender, _sendResponse) {
  if (request.message === "open_popup") {

    faviconUrl = ""
    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      faviconUrl = tab.favIconUrl || "none";
    });

    let popupURL = chrome.runtime.getURL("index.html") +
      `?key=${encodeURIComponent(request.key)}` +
      `&name=${encodeURIComponent(request.name)}` +
      `&icon=${encodeURIComponent(await waitForFavicon())}` +
      `&url=${encodeURIComponent(request.url)}`;

    chrome.windows.create({
      url: popupURL,
      type: "popup",
      width: 300,
      height: 400
    });
  }
});
