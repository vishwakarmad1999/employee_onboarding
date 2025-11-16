import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

import Registration from './Registration'
import Retrieve from './Retrieve'
import NavBar from './NavBar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='' Component={Registration} />
        <Route path='records' Component={Retrieve} />
      </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
 