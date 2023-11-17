/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
// @packages
import React, { useState, useRef, useEffect  } from "react";
import { QRCodeCanvas } from "qrcode.react";

// @scripts
import { AccessCredentials, PlutonicationDAppClient } from "../../../index";
import img from "../../assets/images/testing-image.png";
import backArrowIcon from "../../assets/svg/Arrow Back.svg";

// @styles
import "./Welcome.css";


const Welcome = (): React.JSX.Element => {
  const [qrCodeImage, setQRCodeImage] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [pubKey, setPubkey] = useState("");
  const overlayRef = useRef(null);

  const accessCredentials = new AccessCredentials(
    "wss://plutonication-acnha.ondigitalocean.app/",
    "1",
    "Galaxy Logic Game",
    "https://rostislavlitovkin.pythonanywhere.com/logo"
  );
  const initializeDapp = async (): Promise<void> => {
    try {
      showQRCode();
      await PlutonicationDAppClient.InitializeAsync(accessCredentials, (pubKey) => {
        console.log("Received pubkey: ", pubKey);
        setPubkey(pubKey);
      });

    } catch (e) {
      console.log("Error initializing the app: ", e);
    }
  };

  useEffect(() => {
    if (pubKey !== "") {
      setQRCodeImage("");
    }
  }, [pubKey]);

  const showQRCode = ():void  => {
    const uriValue = PlutonicationDAppClient.generateQR(accessCredentials);
    setQRCodeImage(uriValue);
    setIsWalletConnected(true);
  };

  const disconnect = ():void => {
    // disconnect functionality here
    console.log("Disconnecting!");
    setIsWalletConnected(false);
    closeQR();
  };

  const closeQR = ():void => {
    setQRCodeImage("");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (overlayRef.current === e.target) {
      closeQR();
    }
  };

  console.log("qrCodeImage", qrCodeImage);

  return (
    <div className={`welcome__container ${qrCodeImage ? "overlay" : ""}`} ref={overlayRef} onClick={e => handleOverlayClick(e)}>
      <main>
        {qrCodeImage ? (
          <>
            <div className="welcome__QR-text-container">
              <p className="welcome__QR-text">Plutonication Connect</p>
            </div>
            <img className="welcome__QR-back-arrow" alt="close" onClick={closeQR} src={backArrowIcon} width={25} height={25}/>
            <div className="welcome__QR-container" >
              <QRCodeCanvas size={250} className="welcome__QR" value={qrCodeImage}  imageSettings={{
                src: `${img}`,
                x: undefined,
                y: undefined,
                height: 30,
                width: 30,
                excavate: true,
              }}
              bgColor="#FFFFFF"
              level={"H"}
              />
            </div>
            <div className="welcome__QR-text-button-container">
              <p className="welcome__QR-text">Scan this QR with your phone</p>
            </div>
          </>
        ) : (
          <>
            <h4 className="welcome__QR-headaer">Welcome to Plutonication</h4>
            <div className={"welcome__btn-container"}>
              <button className="welcome__btn" onClick={() => isWalletConnected ? disconnect() : initializeDapp()}>
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
