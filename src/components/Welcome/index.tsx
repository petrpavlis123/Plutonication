import React, { useState, useRef, useEffect  } from "react";
import "./Welcome.css";
import { AccessCredentials, PlutonicationDAppClient } from "../../index";
import { QRCodeCanvas } from "qrcode.react";
import img from "../../assets/images/testing-image.png";
import backArrowIcon from "../../assets/svg/Arrow Back.svg";
import { error } from "console";
// import backArrowIcon from "../../assets/images/arrow-back.png";


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
  const initializeDapp = async () => {
    try {
      showQRCode();
      const injected = await PlutonicationDAppClient.InitializeAsync(accessCredentials, (pubKey) => {
        console.log("Pubkey recibida:", pubKey);
        setPubkey(pubKey);
      });

    } catch (e) {
      // console.log("Error al inicializar:", error)
    }
  };

  useEffect(() => {
    if (pubKey !== "") {
      setQRCodeImage("");
    }
  }, [pubKey])

  const showQRCode = () => {
    const uriValue = PlutonicationDAppClient.generateQR(accessCredentials);
    setQRCodeImage(uriValue);
    setIsWalletConnected(true);
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
              {/* <img className="welcome__QR-img" src={img} alt={"Logo"} width={60} height={60}/> */}
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
