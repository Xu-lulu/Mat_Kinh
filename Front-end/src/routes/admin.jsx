import HomeAdmin from "../components/admin/Products/HomeAdmin";
import Login from "../components/auth/Login";
import CreateProduct from "../components/admin/Products/CreateProduct";

import Update from "../components/admin/Products/update";
import "../App.css";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";
import Register from "../components/auth/Register";
import HomeProducts from "../components/admin/Products/Homeproduct";
import { NavbarAdminLogout } from "../components/admin/Products/NavbarAdmin";
import { NavbarAdminLogoutHidden } from "../middleware/NavFood";
import CategoryAdmin from "../components/admin/Products/CategoryAdmin/CategoryAdmin";
import CreateCategory from "../components/admin/Products/CategoryAdmin/CreateCategory";
import UpdateCategory from "../components/admin/Products/CategoryAdmin/updateCategory";

const Admin = () => {
  const location = useLocation();
  return (
    <>
      <div className="NavbarAdminLogout">
        <NavbarAdminLogoutHidden />
      </div>
      <Routes>
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/productadmin" element={<HomeProducts />}></Route>
        <Route path="/createProduct" element={<CreateProduct />}></Route>
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/categoryadmin" element={<CategoryAdmin />} />
        <Route path="/createCategory" element={<CreateCategory />}></Route>
        <Route path="/editcategory/:id" element={<UpdateCategory/>} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};
export default Admin;
