export const htmlTemplate: string = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plutonication</title>
    <base href="/"> 
  </head>
<body>
  <main class="plutonication__component">
    <div>
      <div class="plutonication__qr-header">
        <p class="plutonication__qr-title">Plutonication</p>
        <span class="close">&times;</span>
        <img class="back"src="../../images/arrow-back.svg" alt="back" width="50" height="50">
        </div>
      <div class="plutonication__qr-container">
        <div id="content" class="plutonication__qr-content">
          <div id="qr-code" class="plutonication__qr-code"></div>
        </div>
      </div>
      <div id="wallets" class="plutonication__wallets-container">
        <p>Supported Wallets:</p>
        <div class="plutonication__wallets-content">
        </div>
      </div>
      <div class="plutonication__wallets-btn-container plutonication__wallets-btn-container-hidden">
        <button data-platform="android" class="plutonication__wallets-btn-download">
            <div class="plutonication__wallets-btn-content">
                <img src="../../images/google-play.svg" alt="google" width="30" height="30"/>
                <div>
                    <p class="plutonication__wallets-btn-p1">Get in on</p>
                    <p class="plutonication__wallets-btn-p2">Google Play</p>
                </div>
            </div>
        </button>
        <button data-platform="ios" class="plutonication__wallets-btn-download"> 
            <div class="plutonication__wallets-btn-content">
                <img src="../../images/apple-icon.svg" alt="apple" width="30" height="30"/>
                <div>
                    <p class="plutonication__wallets-btn-p1">Download on the</p>
                    <p class="plutonication__wallets-btn-p2">App Store</p>
                </div>
            </div>
        </button>
    </div>
      <div id="additional-info" class="plutonication__social-media-container">
          <a href="https://plutonication.com/">Docs</a>
          <a href="https://github.com/rostislavLitovkin/plutonication" target="_blank"><img src="../../images/github.svg" alt="Github" width="20" height="20"></a>
          <a href="https://t.me/+CN8Ux4dPAZ8yZWU0" target="_blank"><img src="../../images/telegram.svg" alt="Telegram" width="20" height="20"></a>
          <a href="https://plutonication.com/" target="_blank"><img src="../../images/question-mark.svg" alt="Help" width="20" height="20"></a>
      </div>
      
    </div>
  </main>
</body>
</html>

`
export const cssStyles: string = `
@import url(https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500&family=Libre+Franklin:wght@100&family=Open+Sans&family=Roboto&display=swap);

.plutonication__component {
    margin: 0;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-family: "Roboto", "Inter", "Lexend", "Libre Franklin", "Open Sans", sans-serif;
    width: 320px;
    background-color: #0e1110;
    color: #242529;
    line-height: 26px;
    border: 1px solid #fff;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.plutonication__component-override-styles {
  display: flex;
  padding: 0;
  background-color: white;
}

.plutonication__component > div {
    background-color: #0e1110;
    border-radius: 5px;
    width: 300px;
    align-items: center;
    padding: 20px 30px;
    border-radius: 1rem;
}

.plutonication__component > div .plutonication__qr-header {
    display: flex;
    justify-content: center;
}

.plutonication__component > div .plutonication__qr-header .close,
.plutonication__component > div .plutonication__qr-header .back {
    display: none;
    position: relative;
    left: 100px;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
}

.plutonication__component > div .plutonication__qr-header .back {
  width: 1rem;
  bottom: 10px;
//   left: 120px;
}

.plutonication__component > div .plutonication__qr-header .close:hover,
.plutonication__component > div .plutonication__qr-header .close:focus,
.plutonication__component > div .plutonication__qr-header .back:hover,
.plutonication__component > div .plutonication__qr-header .back:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.plutonication__component .plutonication__qr-title,
.plutonication__component .plutonication__social-media-container p,
.plutonication__component .plutonication__wallets-container p,
.plutonication__component .plutonication__wallets-item-description {
    margin: 0;
    color: #fff;
    font-weight: bold;
}

.plutonication__component .plutonication__qr-container {
    text-align: center;
    background-color: #0e1110;
    border-radius: 1rem;
}

.plutonication__component .plutonication__qr-container div:first-child {
    display: flex;
    justify-content: center;
}

.plutonication__component .plutonication__qr-container div:first-child p {
    width: 280px;
    margin-left: 1.3rem;
}

.plutonication__component .plutonication__qr-container div:first-child span {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
}

.plutonication__component .plutonication__qr-container div:first-child span:hover {
    cursor: pointer;
    color: #fff;
}

.plutonication__component .plutonication__qr-container .plutonication__qr-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.plutonication__component .plutonication__qr-container .plutonication__qr-content .plutonication__qr-code {
    border: 2px solid #020727;
    background-color: #0e1110;
    border-radius: 1rem;
    margin: 1rem;
}

.plutonication__component .plutonication__qr-container .plutonication__qr-content .plutonication__qr-code img {
    height: 200px;
    width: 200px;
    border-radius: 10px;
    display: block;
    margin: auto;
    background-color: #fff;
}

.plutonication__component .plutonication__wallets-container {
    border-top: none;
    padding: 1rem 0;
}

.plutonication__component .plutonication__wallets-container p {
    font-size: .7rem;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    column-gap: .5rem;
    row-gap: .5rem;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item,
.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    padding-top: .4rem;
    background-color: #393939;
    border-radius: 10px;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item img,
.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus img {
    border-radius: 1rem;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item .plutonication__wallets-item-description,
.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus .plutonication__wallets-item-description {
    display: block;
    text-align: center;
    font-size: .65rem;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70px;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item .plutonication__wallets-item-description:hover,
.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-plus .plutonication__wallets-item-description:hover {
    white-space: normal;
    width: auto;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content .plutonication__wallets-item-hidden {
    display: none;
}

.plutonication__component .plutonication__wallets-container .plutonication__wallets-content div:hover {
    cursor: pointer;
}

.plutonication__component .plutonication__wallets-btn-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 200px;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download {
    border-radius: .5rem;
    background: #393939;
    color: #fff;
    padding: .4rem;
    border-color: #393939;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download:hover {
    cursor: pointer;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content img {
    margin-right: .3rem;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content .plutonication__wallets-btn-p1 {
    font-size: .7rem;
    text-align: justify;
    margin: 0;
}

.plutonication__component .plutonication__wallets-btn-container .plutonication__wallets-btn-download .plutonication__wallets-btn-content .plutonication__wallets-btn-p2 {
    font-size: .9rem;
    text-align: justify;
    margin: 0;
}

.plutonication__component .plutonication__wallets-btn-container-hidden {
    display: none;
}

.plutonication__component .plutonication__social-media-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.plutonication__component .plutonication__social-media-container > a:first-of-type {
    text-decoration: none;
    color: #fff;
}

.plutonication__component .plutonication__social-media-container a {
    margin-left: 1rem;
}

`
