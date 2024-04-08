import Products from "../components/Products/Products";
import Cart from "../components/Cart/Cart";
import DetailProduct from "../components/detaiproducts/DetailProduct";
import Home from "../components/Home";
import CategoryProducts from "../components/categorys/CategoryProducts";
import Login from "../components/auth/Login";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "../components/auth/Register";
import Pay from "../components/Pay/pay";

const PublicRoute = () => {
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
        <Route path="/myCart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};
export default PublicRoute;
