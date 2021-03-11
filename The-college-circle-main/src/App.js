import React from 'react';
import Main from './components/MainComponent'
import {BrowserRouter} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App" style={{height:"100vh",width:"100%"}}>
    <BrowserRouter>
        <div>
          <Main />
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
