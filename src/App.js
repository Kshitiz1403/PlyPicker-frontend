import "./App.css";
import HomePage from "./HomePage/HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductPage from "./ProductPage/ProductPage";

export const PORT = "http://a495-103-87-58-202.ngrok.io/api";
function App() {
  return (
    <>
      {/* <HomePage /> */}
      <ProductPage />
      {/* <ProductDetails /> */}
    </>
  );
}

export default App;
