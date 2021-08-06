import React from 'react';
import Main from './components/MainComponent'
import {BrowserRouter} from 'react-router-dom'
import { library } from  '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {
  library.add(fas);
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
