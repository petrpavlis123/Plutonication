# Plutonication

Plutonication is a TypeScript library for create a communication between dapps and wallets across platforms

# Requirements

- Node.js and npm installed on your system.

The package uses **node v18**

# Instalation

NPM package: https://www.npmjs.com/package/@plutonication/plutonication

```
npm i @plutonication/plutonication
```

# Other versions

- C# - https://github.com/cisar2218/Plutonication/tree/main

# Usage

The overall structure of Plutonication is designed to be as little intrusive as possible.

A comprehensive guide adding Plutonication to your dApp / Wallet can be found here: https://plutonication-acnha.ondigitalocean.app/docs/javascript.

# React dApp example

In the `example_dapp` folder, you can find a typescript React application that implements Plutonication.

### React dApp docs

A detailed description of the Plutonication implementation can be found:

1) https://plutonication-acnha.ondigitalocean.app/docs/react-example
2) in the `src/app.ts` file.

### Docker

The following docker file runs the sample React dApp, which can be used for testing all plutonication dApp functionalities.

```
cd example_dapp

docker build -t plutonication-react-dapp-example . 

docker run -p 3000:3000 plutonication-react-dapp-example
```

### Run locally

```
cd example_dapp

# Install the dApp dependencies
npm i

npm start
```

# How Plutonication works

The private key is always saved in your wallet on your phone and is never sent anywhere.

You need to pair the dApp with the wallet. To do so, the wallet needs to receive a special link with information needed to establish the connection. The wallet can receive this link, for example, by scanning a QR code. Once the link is received, the dApp and the wallet will get paired via websockets to establish a stable connection between different platforms. After the connection is established, the wallet is ready to receive any Extrinsics, which it can then sign and send back to the dApp.

To get a more in-depth details of the underlying backend, read this guide: https://plutonication-acnha.ondigitalocean.app/docs/flask-server.

# Build the package locally

```
# Install all dependencies
npm i

npm run build
```

# Testing

### Unit tests
The provided tests showcase how Plutonication can be implemented for both dApps and Wallets.

```
cd tests

# Install all testing dependencies
npm i

npx playwright test
```

### E2E testing with Pluto wallet

Firstly, you will need to run the sample React dApp that can be used for testing.

```
cd example_dapp

# Install the dApp dependencies
npm i

npm start
```

Then, you will need to get Pluto wallet on your phone. There are multiple ways to get it:
1) Download it from Google Play (for Android phones): https://play.google.com/store/apps/details?id=com.rostislavlitovkin.plutowallet
2) Build and deploy it locally from this repo (for all platforms): https://github.com/rostislavLitovkin/plutowallet

After installation completes, click on the QR code scanner icon on the top-right corner of the screen to open the universal QR code scanner. Then scan the Plutonication QR modal and accept the connection. PlutoWallet and the dApp will successfully pair. PlutoWallet is now ready to receive any transaction requests.

If you are not sure about any of these steps, you can also follow this video guide, that showcases the whole process of connecting your PlutoWallet to the dApp and signing a transaction request: https://youtu.be/lVVcgNs7KRk?si=X_SohjoVUprai1r1

# Limitations

- both devices need to support internet connection

# dApps utilising Plutonication
- [Plutonication Extension](https://github.com/RostislavLitovkin/PlutonicationExtension)
- [Galaxy Logic Game](https://github.com/RostislavLitovkin/galaxylogicgamemaui)

Feel free to add your own project by making a PR.

# Wallets utilising Plutonication
- [PlutoWallet](https://github.com/RostislavLitovkin/PlutoWallet)

Feel free to add your own project by making a PR.

# Inspiration
- [https://walletconnect.com/](https://walletconnect.com/)

# Contributions
Contributions are welcome. If you wish to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature/new-feature.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push your changes to your fork: git push origin feature/new-feature.
5. Open a Pull Request in the original repository.

# License
This project is licensed under the MIT License.
