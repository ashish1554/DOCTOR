import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppContextProvider from './Context/AppContext.jsx'
import './index.css'
import './tailwind.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
