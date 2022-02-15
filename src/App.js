import "./App.css";
import HomePage from "./HomePage/HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductPage from "./ProductPage/ProductPage";

export const PORT = 'http://localhost:5000/api'
function App() {
  return (
    <>
      <HomePage />
      {/* <ProductPage /> */}
      {/* <ProductDetails /> */}
    </>
  );
}

export default App;
