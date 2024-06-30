// html wrapper is needed for prettier formatting
// install: https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
const html = String.raw;

const wallet = html`
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .plutonication__component .plutonication__wallets-content .plutonication__wallet-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
      padding: 10px;
      background-color: #393939;
      border-radius: 10px;
      cursor: pointer;
    }

    .plutonication__component .plutonication__wallets-content .plutonication__wallet-container .plutonication__wallet-icon {
      border-radius: 10px;
      margin-bottom: 5px;
    }

    .plutonication__component .plutonication__wallets-content .plutonication__wallet-container .plutonication__wallet-description {
      display: block;
      text-align: center;
      font-size: 10px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60px;
      margin-top: 5px;
    }

    .plutonication__component .plutonication__wallets-content .plutonication__wallet-container .plutonication__wallet-description:hover {
      width: auto;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <div class="plutonication__wallet-container">
    <img class="plutonication__wallet-icon" alt="wallet icon" width="50" height="50">
    <span class="plutonication__wallet-description">
      <!-- description text -->
    </span>
  </div>
</body>

</html>
`

export default wallet
