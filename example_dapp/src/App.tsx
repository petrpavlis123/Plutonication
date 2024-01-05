import React from 'react';
import logo from './logo.svg';
import './App.css';
import { initializePlutonicationDAppClientWithModal, AccessCredentials } from '@plutonication/plutonication';
import '@plutonication/plutonication';
import "./MyGreeter"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => initializePlutonicationDAppClientWithModal(
          new AccessCredentials(
            "wss://plutonication-acnha.ondigitalocean.app/",
            "100",
            "Plutonication test",
            "https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite"
          ),
          (_) => { }
        )}>Connect</button>

        <plutonication-modal></plutonication-modal>

      </header>
    </div>
  );
}

export default App;
