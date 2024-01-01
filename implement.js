import { AccessCredentials, initializePlutonicationDAppClient } from "./lib/index.js";

async function click2() {
    const accessCredentials = new AccessCredentials(
        "wss://plutonication-acnha.ondigitalocean.app/",
        "7",
        "Galaxy Logic Game",
        "https://rostislavlitovkin.pythonanywhere.com/logo"
    )

    await initializePlutonicationDAppClient(accessCredentials)

    console.log("All done")
}