# Todo

- [ ] module base - that can be published on NPM, Yarn, PNPM...
- [ ] Setup linter (I will leave it up to your preferences)
    
- [ ] `AccessCredetials` type
```js
// Access credentials are used to show correct info to the wallet.
// These are values that the AccessCredentials will have:

public string Url { get; set; } = "wss//plutonication-acnha.ondigitalocean.app" // Default value
public string Key { get; set; } = <cryptographically random key> // Default value
public string Name { get; set; } // optional
public string Icon { get; set; } // optional
```

- [ ] `string GenerateKey()` method for generating a cryptographically random key

The package will contain 2 main things:
  - PlutonicationDAppClient
  - PlutonicationWalletClient

- [ ] make 2 js apps to **test** the functionalities (simulate a polkadot dApp / Wallet) - Automated tests are also fine




# PlutonicationDAppClient

Needs to be compatible with polkadot.js api

Follow the specs [here](https://github.com/w3f/Grants-Program/blob/master/applications/Plutonication.md#milestone-3-plutonication-typescript-version). If you are unable to complete any of the things mentioned in the grant proposal, please tell me asap. 

Also take inspiration from c# version, which is very well documented: https://github.com/cisar2218/Plutonication
