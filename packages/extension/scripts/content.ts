// read an changed the content of a page
// Listen messages from the dapp
window.addEventListener('message', (event) => {
  console.log("event", event);
  if (event.origin === window.location.origin && event.data.type === 'OPEN_POPUP') {
    const dataFromQR = event.data.data;
    console.log('Datos recibidos de la DApp:', dataFromQR, event);
    // Send message to the background of the extension
    chrome.runtime.sendMessage({ type: 'OPEN_POPUP', data: event.data.data });
  }
});

