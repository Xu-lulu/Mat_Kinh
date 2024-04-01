import Footer from "../components/Footer/Footer";
import Navbars from "../components/Navbars/Navbars";
import Products from "../components/Products/Products";
import Cart from "../components/Cart/Cart";
import DetailProduct from "../components/detaiproducts/DetailProduct";
import Home from "../components/Home";
import CategoryProducts from "../components/categorys/CategoryProducts";
import Login from "../components/auth/Login";
// import "../App.scss";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";
import Register from "../components/auth/Register";

const PublicRoute = (props) => {
  const { dataProducts} = props;
  return (
    <>
      <Routes>
        {/* <Route path="/"  */}
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/admin"
          element={<HomeAdmin allProducts={allProducts} />}
        /> */}
        {/* <Route path="/createProduct" element={<CreateProduct />}></Route>
        <Route
          path="/edit/:id"
          element={<Update dataProducts={dataProducts} />}
        /> */}

        <Route path="/detail/:id" element={<DetailProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:name" element={<CategoryProducts />} />
        <Route path="/myCart" element={<Cart dataProducts={dataProducts} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};
export default PublicRoute;
