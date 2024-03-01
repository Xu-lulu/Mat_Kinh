import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbars from "./components/Navbars/Navbars";
import axios from "axios";
import Products from "./components/Products/Products";
import { CartContext } from "./Contexts/CartContext";
import Cart from "./components/Cart/Cart";
import DetailProduct from "./components/Products/DetailProduct";
import CreateProduct from "./components/admin/CreateProduct";
import Home from "./components/Home";
import HomeAdmin from "./components/admin/HomeAdmin";
import Update from "./components/admin/update";
import CategoryProducts from "./components/Products/CategoryProducts";
// import './components/Products/Products.scss'
//
function App() {
  const [allProducts, setallProducts] = useState([]);
  const [myCart, addtoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    function getData() {
      const res = axios.get("http://localhost:3000/allproducts");
      return res;
    }
    getData().then((res) => setallProducts(res.data));
    getData().catch((err) => setloading(true));
  }, []);

  return (
    <CartContext.Provider
      value={{ myCart, addtoCart, total, setTotal, count, setCount }}
    >
      <Router>
        <Navbars />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={<HomeAdmin allProducts={allProducts} />}
            />
            <Route path="/createProduct" element={<CreateProduct />}></Route>
            <Route
              path="/edit/:id"
              element={<Update allProducts={allProducts} />}
            />

            <Route
              path="/detail/:id"
              element={<DetailProduct allProducts={allProducts} />}
            />
            <Route
              path="/products"
              element={<Products allProducts={allProducts} loading={loading} />}
            />
            <Route
              path="/products/category/:name"
              element={<CategoryProducts allProducts={allProducts} />}
            />
            <Route
              path="/myCart"
              element={<Cart allProducts={allProducts} />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
