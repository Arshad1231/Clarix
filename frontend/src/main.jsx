import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AssetsProvider } from './Context/SiteContents.jsx'
import { AuthProvider } from './Context/AuthContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AssetsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AssetsProvider>
    </AuthProvider>
  </StrictMode>,
)
