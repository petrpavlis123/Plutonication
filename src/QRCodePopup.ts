// @packages
import * as qrcode from "qrcode";
import * as fs from "fs";

const generateQR = async (accesCredentialUri: string | qrcode.QRCodeSegment[], outputPath: string ): Promise<void> => {
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(accesCredentialUri);
    const base64Data = qrCodeDataUrl.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(outputPath, buffer);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

export { generateQR };
