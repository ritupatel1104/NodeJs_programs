import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

// Existing Imports
import Login from './pages/Login'
import JoinUs from './pages/joinus'
import ProfilePage from './pages/ProfilePage'
import Home from './pages/Home'
import EditProfilePage from './pages/EditProfile'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'

// New Page Imports (Make sure to create these files)










// Global Components
import Navbar from './components/Navbar'
import ChatDrawer from './components/ChatDrawer'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import OrderSummary from './pages/OrderSummary'

const App = () => {
  const location = useLocation();
  const hideOnPaths = ['/', '/login', '/join'];
  const shouldShowGlobals = !hideOnPaths.includes(location.pathname);

  return (
    <div className="bg-[#050505] min-h-screen relative antialiased selection:bg-indigo-500 selection:text-white">
      {shouldShowGlobals && <Navbar />}

      <main className="relative z-10">
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage/>} />







          
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinUs />} />
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
        </Routes>
      </main>

      {shouldShowGlobals && <ChatDrawer />}
    </div>
  )
}

export default App;