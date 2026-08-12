import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { Route, Routes } from 'react-router'
import './index.css'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={ <CheckoutPage /> } />
    </Routes>
  );
}

export default App
