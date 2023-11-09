import React, { useState } from "react";
import "./Welcome.css";
import { AccessCredentials, PlutonicationDAppClient } from "../../index";
import { QRCodeCanvas } from "qrcode.react";

const Welcome = (): React.JSX.Element => {
  const [qrCodeImage, setQRCodeImage] = useState("");

  const accessCredentials = new AccessCredentials(
    "wss://plutonication-acnha.ondigitalocean.app/",
    "1",
    "Galaxy Logic Game",
    "https://rostislavlitovkin.pythonanywhere.com/logo"
  );
  const initializeDapp = async () => {

    // await PlutonicationDAppClient.InitializeAsync(accessCredentials, (pubkey: string) => {
    //   console.log("App initialized with publicKey:", pubkey);
    // });

    const uriValue = PlutonicationDAppClient.generateQR(accessCredentials);
    console.log("uriValue", uriValue);
    setQRCodeImage(uriValue);
  };

  const closeQR = () => {
    setQRCodeImage("");
  };

  console.log("qrCodeImage", qrCodeImage);

  return (
    <div className={"welcome__container"}>
      <main>
        {qrCodeImage ? (
          <>
            <div className="welcome__QR-text-container">
              <p className="welcome__QR-text">Plutonication Connect</p>
              <button className="welcome__btn-close" onClick={closeQR}>
                X
              </button>
            </div>
            <div className="welcome__QR-container  welcome__QR-show" >
              <QRCodeCanvas className="welcome__QR" value={qrCodeImage} />
            </div> 
            <p className="welcome__QR-text">Scan this QR with your phone</p>
          </>
        ) : (
          <>
            <h4 className="welcome__QR-headaer">Welcome to Plutonication</h4>
            <div className={"welcome__btn-container"}>
              <button className="welcome__btn" onClick={e => initializeDapp()}>
                Connect
              </button>
            </div>
          </>
        )}



        {/* <h4>Welcome to Plutonication</h4>
        <div className={"welcome__btn-container"}>
          <button className="welcome__btn" onClick={e => initializeDapp()}>
            Connect
          </button>
        </div>
        {qrCodeImage && (
         <div className="welcome__QR" ><QRCodeCanvas value={qrCodeImage} /></div> 
        )} */}
      </main>
    </div>
  );
};

export default Welcome;
