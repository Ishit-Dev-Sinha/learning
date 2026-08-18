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

  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/cart-items")
      .then((response) => {
        setCartItems(response.data);
      })
  });


  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App
