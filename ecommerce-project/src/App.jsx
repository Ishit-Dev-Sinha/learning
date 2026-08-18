import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { Route, Routes } from 'react-router'
import axios from "axios";
import { useEffect, useState } from 'react';
import './index.css'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      })
  });


  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App
