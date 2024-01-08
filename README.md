# Plutonication

Plutonication is a TypeScript library for create a communication between dapps and wallets across platforms


## Requirements
- Node.js and npm installed on your system.

## Instalation

```javascript
npm i @plutonication/plutonication
```

## Other versions
- C#:  https://github.com/cisar2218/Plutonication/tree/main
- Kotlin - planned
- Swift - planned

## Usage
The overall structure of Plutonication is designed to be as little intrusive as possible.

If you are building a dApp, you will want to interact with initializePlutonicationDAppClientWithModal functionality.

Here is how:

In a react application you can use it like this:

```javascript
import {AccessCredentials, initializePlutonicationDAppClientWithModal} from "@plutonication/plutonication";
```

To access the initializePlutonicationDAppClientWithModal function, you need to instantiate the AccessCredentials with the necessary information, and you need to use the Plutonication modal web component to get the QR for make the connection:

```javascript
// Import the functionalities from the package
import {AccessCredentials, initializePlutonicationDAppClientWithModal} from "@plutonication/plutonication";

// Provide the correct acces cfedentials
 const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Plutonication test",
  "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
);

// Get the qr code to make the connection
await initializePlutonicationDAppClientWithModal(
  accessCredentials,
  (receivedPubkey) => {
    console.log("receivedPubkey", receivedPubkey);
  }
);

// Use Plutonication modal web component to render the QR
<plutonication-modal></plutonication-modal>
```

With pure HTML using the bundle file plutonication.js, like this:
```javascript
  <!-- Custom Plutocation modal Web Component -->
  <plutonication-modal></plutonication-modal>
  <script src="node_modules/@plutonication/plutonication/lib/plutonication.js"></script>
```

### Testing
```
cd tests

npm i

npx playwright test
```

### Problem / Motivation

Currently, there is no way to connect a wallet to more exotic devices, like gaming console and wearables.

## How it works
The private key is always saved in your wallet on your phone and is never sent anywhere. You need to pair the dApp with the wallet. To do so, the wallet needs to receive a special link with information needed to establish the connection. The wallet can receive this link, for example, by scanning a QR code. Once the link is received, the dApp and the wallet will get paired via websockets to establish a stable connection between different platforms. After the connection is established, the wallet is ready to receive any Extrinsics, which it can then sign and send back to the dApp.

## Some usage examples
Simple example for ReactJs:
```javascript
function ExampleDapp() {
  let account; // This is the Injected account object that will connect via Plutonication

  const initialize = async () => {
    // Provide the acces credentials information to show correct info to the wallet
    const accessCredentials = new AccessCredentials(
      "wss://plutonication-acnha.ondigitalocean.app/",
      "1",
      "Plutonication test",
      "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
    );

    // Use initializePlutonicationDAppClientWithModal to connect through the modal
    account = await initializePlutonicationDAppClientWithModal(
      accessCredentials,
      (receivedPubkey) => {
        console.log("receivedPubkey", receivedPubkey);
      }
    );
  };

  // After succesfully connect you can sign the message
  const signMessage = async () => {

    const rawMessage = {
      address: account.address,
      data: "0x3c42797465733e48656c6c6f20537562737472617465206d6573736167653c2f42797465733e",
      type: "bytes",
    }

    const rawSignatureResult = await account.signer.signRaw(rawMessage)
  };

  return (
    <div>
        <!-- Plutonication modal web component -->
      <plutonication-modal></plutonication-modal>
      <button onClick={initialize}>Connect</button>
      <button onClick={signMessage}>Sign message</button>
    </div>
  );
};

export default ExampleDapp;
```

Simple example for html use:
```javascript

// Your html file
<body>
  <!-- Custom Plutocation modal Web Component -->
  <plutonication-modal></plutonication-modal>

  <!-- Button for connecting -->
  <button onclick="initialize()">Connect</button>

  <!-- Button for requesting a message signature -->
  <button onclick="signMessage()">Sign message</button>

  <script src="node_modules/@plutonication/plutonication/lib/plutonication.js"></script>

  <script>
    let account // This is the Injected account object that will connect via Plutonication

    async function initialize() {

      const accessCredentials = new Plutonication.AccessCredentials(
        "wss://plutonication-acnha.ondigitalocean.app/",
        "100",
        "Plutonication test",
        "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
      )

      console.log("accessCredentials:", accessCredentials.ToUri());
      
      account = await Plutonication.initializePlutonicationDAppClientWithModal(
        accessCredentials,
        (receivedPubkey) => {
          console.log("receivedPubkey", receivedPubkey);
        },
      )

      console.log("injected", account)
    }

    async function signMessage() {
      if (account == null) {
        console.warn("Account has not connected yet.")
        return;
      }

      const rawMessage = {
        address: account.address,
        data: "0x3c42797465733e48656c6c6f20537562737472617465206d6573736167653c2f42797465733e",
        type: "bytes",
      }

      const rawSignatureResult = await account.signer.signRaw(rawMessage)

      console.log("Signature received: ", rawSignatureResult)
    }
  </script>
</body>
```

### Plutonication Server
- Used for reliable establishing of connection.
- Passes payloads between Wallets and dApps.

### Mobile Wallet
- Has access to the private key
- signs the payloads and sends them back to the dApp.
- Never exposes the private key

### dApp
- needs to have access to either: Plutonication Native / Plutonication Extension

### Plutonication Native
- A simple package that allows the dApp get connected with the Mobile Wallet.
- Connects the dApp with the Plutonication server.
- Helps to generate a QR code for the Wallet to 

### Plutonication Extension
a polkadot.js extension that works with any existing dApp that supports polkadot.js extension.
Connects the dApp with the Plutonication server.
Generate a QR code for the Wallet to establish the connection.

## Limitations
- both devices need to support internet connection

## dApps utilising Plutonication
- [Plutonication Extension](https://github.com/RostislavLitovkin/PlutonicationExtension)
- [Galaxy Logic Game](https://github.com/RostislavLitovkin/galaxylogicgamemaui)

## Wallets utilising Plutonication
- [PlutoWallet](https://github.com/RostislavLitovkin/PlutoWallet)

Feel free to add your own project by making a PR.

## Inspiration
- [https://walletconnect.com/](https://walletconnect.com/)

## Contributions
Contributions are welcome. If you wish to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature/new-feature.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push your changes to your fork: git push origin feature/new-feature.
5. Open a Pull Request in the original repository.

## License
This project is licensed under the MIT License. 