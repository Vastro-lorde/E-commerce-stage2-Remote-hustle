
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./component/Header";

// Lazy load pages for mobile loading
const HeroSlider = lazy(() => import("./component/Swiper"));
const FetchProducts = lazy(() => import("./component/FetchedProducts"));
const ProductView = lazy(() => import("./component/ProductView"));
const Cart = lazy(() => import("./component/Cart"));
const Checkout = lazy(() => import("./component/CheckOut"));
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/SignUp"));
const About = lazy(() => import("./component/About"));
const Footer = lazy(() => import('./component/Footer'))

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
