import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { Route, Routes } from 'react-router'
import './index.css'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App
