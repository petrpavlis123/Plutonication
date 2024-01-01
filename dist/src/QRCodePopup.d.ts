import * as qrcode from "qrcode";
declare const generateQR: (accesCredentialUri: string | qrcode.QRCodeSegment[], outputPath: string) => Promise<void>;
export { generateQR };
