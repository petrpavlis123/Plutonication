// Send data from the extension to the dapp
chrome.runtime.onMessage.addListener(async function (request, _sender, _sendResponse) {
  console.log("request", request);
  if (request.message === "OPEN_POPUP") {
    console.log("Datos recibidos del código QR:", request.data);
  }
});

async function sendMessageToDApp(data: any) {
  // send message to the daa
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id as number, { message: "data_from_extension", data: data });
  });
}

// example: Después de que el usuario haga clic en la acción de extensión, la extensión verificará si la URL coincide con una página de documentación
// incorpora secuencia de comandos a la pestana activa activeTab
// const extensions = 'https://developer.chrome.com/docs/extensions'
// const webstore = 'https://developer.chrome.com/docs/webstore'

// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
//     // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     // Next state will always be the opposite
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON'

//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//   }
// });
