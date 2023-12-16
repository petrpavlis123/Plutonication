import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady, mnemonicGenerate, encodeAddress } from "@polkadot/util-crypto";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { AccessCredentials } from "../AccesCredentials";
import { PlutonicationWalletClient } from "../PlutonicationWalletClient";

class KeyringManager {
  private keyring: Keyring;

  constructor() {
    this.keyring = new Keyring({ type: "sr25519" });
  }

  public async generateNewPair(): Promise<{ pubKeySS58Format: string; signature: string }> {
    await cryptoWaitReady();

    const mnemonic = mnemonicGenerate();
    const account = this.keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
    const publicKey = account.publicKey;
    const pubKeySS58Format = encodeAddress(publicKey, 42);

    const message = stringToU8a("this is our message");
    const signature = account.sign(message);
    const isValid = account.verify(message, signature, account.publicKey);
  
    console.log(`${u8aToHex(signature)} is ${isValid ? "valid" : "invalid"}`);


    return { pubKeySS58Format, signature: signature.toString()  };
  }
}

export { KeyringManager };

const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

const walletClient = new PlutonicationWalletClient(accessCredentials);
const account = new KeyringManager();

// Realizar operaciones relacionadas con la billetera
void (async (): Promise<void> => {
  try {
    // Inicializar la conexión y otros procesos asincrónicos
    walletClient.initialize();
    const newAccount = await account.generateNewPair();
    walletClient.sendPublicKey(newAccount.pubKeySS58Format);
    walletClient.sendSignedPayload(newAccount.signature);
    walletClient.sendSignedRaw(newAccount.signature.toString());
  } catch (error) {
    console.error("Error:", error);
  }
})();
