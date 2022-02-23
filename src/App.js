import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./CartPage/CartPage";
// import "./App.css";
import HomePage from "./HomePage/HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductPage from "./ProductPage/ProductPage";

export const PORT = "https://plypicker.loca.lt/api";

export let isMobileOrTablet;
function App() {
  isMobileOrTablet = useMediaQuery({
    query: "(max-width:768px)",
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
      {/* <CartPage /> */}
    </>
  );
}

export default App;
