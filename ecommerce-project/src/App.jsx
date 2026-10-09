import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { Route, Routes } from 'react-router'
import { useEffect, useState } from 'react';
import api from './api';
import './index.css';
import './App.css';

function App() {

  const [cart, setCart] = useState([]);

  async function fetchCartData() {
    const response = await api.get('/cart-items?expand=product');
    setCart(response.data);
  }

  useEffect(() => {
    fetchCartData();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cart} fetchCartData={fetchCartData} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} fetchCartData={fetchCartData} />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="orders" element={<OrdersPage cart={cart} fetchCartData={fetchCartData} />} />
    </Routes>
  );
}

export default App
