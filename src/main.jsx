import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import './styles/layout.css'
import './styles/components.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ShippingProvider } from './context/ShippingContext'
import { OrderProvider } from './context/OrderContext'
import CartToast from './components/CartToast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <ShippingProvider>
        <OrderProvider>
          <App />
          <CartToast />
        </OrderProvider>
      </ShippingProvider>
    </CartProvider>
  </StrictMode>,
)