import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RootStoreProvider } from './stores/RootStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </StrictMode>,
)
