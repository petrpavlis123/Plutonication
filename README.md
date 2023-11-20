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

#### Step 1: Import PlutonicationDAppClient
```javascript
import { PlutonicationDAppClient } from '@plutonication/plutonication';
```

#### Step 2: Initialize the Connection and Get the Signature
```javascript
// Access credentials are used to show correct info to the wallet.
const accessCredentials = {
  'YOUR_SERVER_URL',
  'ACCESS_KEY',
  'Application Name',
  'Application Logo URL'
  
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
  await PlutonicationDAppClient.SendPayloadAsync(accessCredentials, transactionDetails);
  console.log("Transaction sent!");
} catch (error) {
  console.error("Error sending transaction:", error);
}

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