import './App.css'
import { AccessCredentials, initializePlutonicationDAppClientWithModal } from "@plutonication/plutonication";
import type { SignerPayloadRaw } from "@polkadot/types/types"
import type { Injected } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from '@polkadot/api';

function App() {
  let account: Injected;
  let publicKey: string;

  const initialize = async () => {
    const accessCredentials = new AccessCredentials(
      "wss://plutonication-acnha.ondigitalocean.app/",
      "Plutonication test",
      "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite",
    );

    console.log("accessCredentials:", accessCredentials.ToUri());

    account = await initializePlutonicationDAppClientWithModal(
      accessCredentials,
      (receivedPubkey: string) => {
        publicKey = receivedPubkey;
        console.log("receivedPubkey", receivedPubkey);
      }
    );

    console.log("injected", account);
  };

  const signMessage = async () => {
    if (account == null) {
      console.warn("Account has not connected yet.")
      return;
    }

    if (account.signer.signRaw == null){
      console.warn("Signer property is not present.")
      return;
    }

    const rawMessage: SignerPayloadRaw = {
      address: publicKey,
      data: "0x3c42797465733e48656c6c6f20537562737472617465206d6573736167653c2f42797465733e",
      type: "bytes",
    }

    const rawSignatureResult = await account.signer.signRaw(rawMessage)

    console.log("Signature received: ", rawSignatureResult)
  };

  const signBalancesTransfer = async () => {
    if (account == null) {
      console.warn("Account has not connected yet.")
      return;
    }

    if (account.signer.signRaw == null){
      console.warn("Signer property is not present.")
      return;
    }

    const api = await ApiPromise.create({ provider: new WsProvider("wss://ws.test.azero.dev") });

    api.tx.balances
      .transfer('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ', 10**12)
      .signAndSend(publicKey, { signer: account.signer }, (status: any) => { });
  }

  return (
    <div>
      <plutonication-modal></plutonication-modal>
      <button onClick={initialize}>Connect</button>
      <button onClick={signMessage}>Sign message</button>
      <button onClick={signBalancesTransfer}>Sign balances_transfer</button>
    </div>
  );
};

export default App;