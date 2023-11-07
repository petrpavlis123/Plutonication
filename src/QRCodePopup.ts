import * as qrcode from "qrcode";
import { AccessCredentials } from "./AccesCredentials";
import * as fs from "fs";

const generateQR = async (accesCredentialUri: string | qrcode.QRCodeSegment[], outputPath: string ): Promise<void> => {
  console.log("accesCredentialUri", accesCredentialUri);
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(accesCredentialUri);
    const base64Data = qrCodeDataUrl.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    fs.writeFileSync(outputPath, buffer);
    console.log("QR code saved to", outputPath);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

// const text = "Hello, World!";

// void generateQR(text, outputPath);

export { generateQR };

// Using it with the accesCredentials
const accessCredentials = new AccessCredentials(
  "wss://plutonication-acnha.ondigitalocean.app/",
  "1",
  "Galaxy Logic Game",
  "https://rostislavlitovkin.pythonanywhere.com/logo"
);
  
const outputPath = "qrcode.png";
void generateQR(accessCredentials.ToUri(), outputPath);