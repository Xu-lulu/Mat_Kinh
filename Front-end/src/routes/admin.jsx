import HomeAdmin from "../components/admin/Products/HomeAdmin";
import Login from "../components/auth/Login";
import CreateProduct from "../components/admin/Products/CreateProduct";
import Update from "../components/admin/Products/update";
import "../App.scss";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "../components/auth/Register";
import HomeProducts from "../components/admin/Products/Homeproduct";
import CategoryAdmin from "../components/admin/Products/CategoryAdmin/CategoryAdmin";
import CreateCategory from "../components/admin/Products/CategoryAdmin/CreateCategory";
import UpdateCategory from "../components/admin/Products/CategoryAdmin/updateCategory";
import NotFound from "../components/NotFound/NotFound";
import Home from "../components/Home";

const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeAdmin />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/productadmin" element={<HomeProducts />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/categoryadmin" element={<CategoryAdmin />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route path="/editcategory/:id" element={<UpdateCategory />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Admin;
