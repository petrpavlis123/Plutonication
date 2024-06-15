import { AccessCredentials, initializePlutonicationDAppClientWithModalForExtension } from "@plutonication/plutonication";

declare global {
    interface Window {
      downloadWallet: (platform: string,  downloadLinks: { android: string; ios: string; }) => void;
    }
}
document.addEventListener('DOMContentLoaded', async() => {
    const extensionContent = document.getElementsByTagName('main')[0];
    extensionContent.style.width = "350px";
    extensionContent.style.height = "460px";
    initialize();
});

let account; 

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
