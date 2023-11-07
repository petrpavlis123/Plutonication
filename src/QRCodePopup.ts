import QRCode from "qrcode";

async function generateQRCode(destinationAddress: string, amount: number): Promise<string> {
  const data = `Address:${destinationAddress}?amount=${amount}`;
  try {
    const qrCodeDataUrl: string = await QRCode.toDataURL(data);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error("Error generating QR code");
  }
}

export default generateQRCode;