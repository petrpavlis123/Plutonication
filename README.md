# Plutonication

Plutonication is a TypeScript library for create a communication between dapps and platforms


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

If you are building a dApp, you will want to interact with PlutonicationDAppClient static class.

Here is how:

In a react application you can use it like this:

#### Step 1: Import PlutonicationDAppClient
```javascript
import { PlutonicationDAppClient, AccessCredentials } from '@plutonication/plutonication';
```

#### Step 2: Initialize the Connection and Get the Signature
You can use the AccesCredentials class or you can pass the object information to the InitializeAsync method.
```javascript
// Access credentials are used to show correct info to the wallet.
const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

// Creating the object and passing it
const accessCredentials = {
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
};

// Initialize the connection
try {
  await PlutonicationDAppClient.InitializeAsync(accessCredentials, (pubKey) => {
    console.log("Received pubkey: ", pubKey);
    setPubkey(pubKey);
    setInitialized(true);
  });

} catch (e) {
  console.log("Error initializing the app: ", e);
}

```

#### Step 3: Send a Transaction
```javascript
const transactionDetails: Transaction = {
  to: 'TRANSACTION_DESTINATION',
  amount: 1000 * 10**12,
};

try {
  await PlutonicationDAppClient.SendPayloadAsy(accessCredentials, transactionDetails);
  console.log("Transaction sent!");
} catch (error) {
  console.error("Error sending transaction:", error);
}

```

#### QR generator
You can also create a QR with the accesCredentials to initialize the connection
```javascript
const uriValue = PlutonicationDAppClient.generateQR(accessCredentials);
// You can set a state varaible with the uri value and pass it like a value to the component or canvas to generate the QR image
setQRCodeImage(uriValue);
```

#### In a nodejs environment you can use it like this:

```javascript
// Create a new instance with the access credentials
const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);

// Create a transaction object like this
const transactionDetails: Transaction = {
  to: "5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ",
  amount: 1000 * 10**12,
};

// First initilize the sever and after send some transactions
PlutonicationDAppClient.InitializeAsync(accessCredentials, (pubKey) => {
  console.log(`PubKey received: ${pubKey}`);
}).then((injected) => {
  console.log("injected", injected);
  PlutonicationDAppClient.SendPayloadAsync(transactionDetails).catch((error) => {
    console.error('Error sending payload:', error);
  });
}).catch((error) => {
  console.error("Error during initialization:", error);
});
```

## How it works

The private key is always saved in your wallet on your phone and is never sent anywhere. You need to pair the dApp with the wallet. To do so, the wallet needs to receive a special link with information needed to establish the connection. The wallet can receive this link, for example, by scanning a QR code. Once the link is received, the dApp and the wallet will get paired via websockets to establish a stable connection between different platforms. After the connection is established, the wallet is ready to receive any Extrinsics, which it can then sign and send back to the dApp.

## Execution
To run your application, simply execute your TypeScript file containing the usage code. Ensure that Node.js is installed on your system, and if you haven't already, compile your TypeScript code to JavaScript using the TypeScript Compiler (tsc).

Run your application with:
```javascript
node your_application.js
```

## Contributions
Contributions are welcome. If you wish to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature/new-feature.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push your changes to your fork: git push origin feature/new-feature.
5. Open a Pull Request in the original repository.

## License
This project is licensed under the MIT License. 