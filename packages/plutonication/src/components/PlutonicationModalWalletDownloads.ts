// @ts-ignore
import googlePlay from "../../images/google-play.png"
// @ts-ignore
import appStore from "../../images/app-store.svg"

// html wrapper is needed for prettier formatting
// install: https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
const html = String.raw;

const plutonicationModalWalletDownloads = html`
<div class="plutonication__wallets-button-container">
  <img id="google-play" src="${googlePlay}" alt="Google Play" width="270" height="80"
    class="plutonication__download-wallet" />
  <img id="app-store" src="${appStore}" alt="App Store" width="270" height="90.25"
    class="plutonication__download-wallet" />
</div>
`

export default plutonicationModalWalletDownloads
