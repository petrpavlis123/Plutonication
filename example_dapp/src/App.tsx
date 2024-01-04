import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PlutonicationModal } from '@plutonication/plutonication';
import { initializePlutonicationDAppClientWithModal } from '@plutonication/plutonication';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button>Connect</button>

      </header>
    </div>
  );
}

export default App;
