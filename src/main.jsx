import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

import Registration from './Registration'
import Retrieve from './Retrieve'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' Component={Registration} />
        <Route path='records' Component={Retrieve} />
      </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
 