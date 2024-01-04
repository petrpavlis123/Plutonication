const click = () => {
  const accessCredentials = new AccessCredentials(
    "wss://plutonication-acnha.ondigitalocean.app/",
    "1",
    "Galaxy Logic Game",
    "https://rostislavlitovkin.pythonanywhere.com/logo"
  );

  const connect = async () => {
    const initialize = await initializePlutonicationDAppClientWithModal(accessCredentials, (receivedPubkey) => {
      console.log("receivedPubkey", receivedPubkey);
    });

    console.log("initialize", initialize);
  };

  document.getElementById("connectButton").addEventListener("click", connect);
}