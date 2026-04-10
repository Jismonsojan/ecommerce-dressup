import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { App } from './App'
import ShopContextProvider from './context/ShopContext'
import CartContextProvider from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
