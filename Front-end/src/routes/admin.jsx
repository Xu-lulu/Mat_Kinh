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
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};
export default Admin;
