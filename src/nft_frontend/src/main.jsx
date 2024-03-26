import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';


import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Tab1 from './Page1.jsx'
import Tab2 from './Page2.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <Routes>
       <Route path = '/' element = {<App/>} />
       <Route path = '/Tab1' element = {<Tab1/>} />
       <Route path = '/Tab2' element = {<Tab2/>} />
     </Routes>
    </BrowserRouter> 
  </React.StrictMode>,
);
