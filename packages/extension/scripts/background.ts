// Send data from the extension to the dapp
chrome.runtime.onMessage.addListener(async function (request, _sender, _sendResponse) {
  console.log("request", request);
  if (request.message === "OPEN_POPUP") {
    console.log("request.data:", request.data);
  }
});

async function sendMessageToDApp(data: any) {
  // send message to the daa
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id as number, { message: "data_from_extension", data: data });
  });
}


