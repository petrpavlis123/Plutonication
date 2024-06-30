import plutonicationModalStyle from "./PlutonicationModalStyle"

// @ts-ignore
import back from "../../images/arrow-back.svg"
// @ts-ignore
import github from "../../images/github.svg"
// @ts-ignore
import telegram from "../../images/telegram.svg"
// @ts-ignore
import questionMark from "../../images/question-mark.svg"

// html wrapper is needed for prettier formatting
// install: https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
const html = String.raw;

const plutonicationModalBase = html`
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${plutonicationModalStyle}</style>
</head>

<body>
  <main class="plutonication__component" id="plutonication__component">
    <div>
      <div class="plutonication__header">
        <p class="plutonication__title">Plutonication</p>
        <img
          class="plutonication__back"
          src="${back}"
          id="plutonication__back"
          alt="back" width="30" height="30">
      </div>

      <div id="plutonication__content">
        <!-- content here -->
      </div>

      <div id="additional-info" class="plutonication__social-media-container">
        <a href="https://plutonication.com/">Docs</a>
        <a href="https://github.com/rostislavLitovkin/plutonication" target="_blank"><img  src="${github}"
            alt="Github" width="20" height="20"></a>
        <a href="https://t.me/+CN8Ux4dPAZ8yZWU0" target="_blank"><img  src="${telegram}" alt="Telegram"
            width="20" height="20"></a>
        <a href="https://plutonication.com/" target="_blank"><img src="${questionMark}" alt="Help"
            width="20" height="20"></a>
      </div>

    </div>
  </main>
</body>

</html>
`

export default plutonicationModalBase
