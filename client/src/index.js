import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Firebase, { FirebaseContext } from './components/general/Firebase/index';
import './index.css';
import App from './App/App';

render((
    <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </FirebaseContext.Provider>
), document.getElementById('root'));