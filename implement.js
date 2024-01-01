import { AccessCredentials, initializePlutonicationDAppClient } from "./dist/index";

async function click() {
    const accessCredentials = new AccessCredentials(
        "wss://plutonication-acnha.ondigitalocean.app/",
        "7",
        "Galaxy Logic Game",
        "https://rostislavlitovkin.pythonanywhere.com/logo"
    )

    await initializePlutonicationDAppClient(accessCredentials)

    console.log("All done")
}