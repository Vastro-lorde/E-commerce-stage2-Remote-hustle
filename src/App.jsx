
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./component/Header";

// Lazy load pages for mobile loading
const HeroSlider = lazy(() => import("./component/Swiper.jsx"));
const FetchProducts = lazy(() => import("./component/FetchedProducts.jsx"));
const ProductView = lazy(() => import("./component/ProductView.jsx"));
const Cart = lazy(() => import("./component/Cart.jsx"));
const Checkout = lazy(() => import("./component/Checkout.jsx"));
const Login = lazy(() => import("./component/Login.jsx"));
const Signup = lazy(() => import("./component/SignUp.jsx"));
const About = lazy(() => import("./component/About.jsx"));
const Footer = lazy(() => import('./component/Footer.jsx'))

function App() {
  return (
    <>
      <Header />

      {/* A wrapers for all lazy components */}
      <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <FetchProducts />
                <Footer />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={
            <>
              <About />
              <Footer />
            </>
          } />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;