import React, { useState, useRef  } from "react";
import "./Welcome.css";
import { AccessCredentials, PlutonicationDAppClient } from "../../index";
import { QRCodeCanvas } from "qrcode.react";
import img from "../../assets/images/testing-image.png";
// import backArrowIcon from "../../assets/svg/Arrow Back.svg";
import backArrowIcon from "../../assets/images/arrow-back.png";


const Welcome = (): React.JSX.Element => {
  const [qrCodeImage, setQRCodeImage] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [pubKey, setPubkey] = useState("5xE555555ds5d5s6adsafasa658d6s");
  const overlayRef = useRef(null);

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
    // setIsWalletConnected(true);
    console.log("uriValue", uriValue);
    setQRCodeImage(uriValue);
  };

  const disconnect = () => {
    // disconnect functionality here
    console.log("Disconnecting!")
    setIsWalletConnected(false)
    closeQR();
  }

  const closeQR = () => {
    setQRCodeImage("");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (overlayRef.current === e.target) {
      closeQR();
    }
  };

  console.log("qrCodeImage", qrCodeImage);

  return (
    <div className={`welcome__container ${qrCodeImage ? 'overlay' : ''}`} ref={overlayRef} onClick={e => handleOverlayClick(e)}>
      <main>
        {qrCodeImage ? (
          <>
            <div className="welcome__QR-text-container">
              <p className="welcome__QR-text">Plutonication Connect</p>
            </div>
            <img className="welcome__QR-back-arrow" alt="close" onClick={closeQR} src={backArrowIcon} width={25} height={25}/>
            <div className="welcome__QR-container" >
              <QRCodeCanvas size={250} className="welcome__QR" value={qrCodeImage} />
              <img className="welcome__QR-img" src={img} alt={"Logo"} width={60} height={60}/>
            </div>
            <div className="welcome__QR-text-button-container">
              <p className="welcome__QR-text">Scan this QR with your phone</p>
            </div>
          </>
        ) : (
          <>
            <h4 className="welcome__QR-headaer">Welcome to Plutonication</h4>
            <div className={"welcome__btn-container"}>
              <button className="welcome__btn" onClick={e => isWalletConnected ? disconnect() : initializeDapp()}>
                {isWalletConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
           {isWalletConnected && <p className="welcome__QR-text-connected">Connected to {pubKey} </p>}
          </>
        )}
      </main>
    </div>
  );
};

export default Welcome;
