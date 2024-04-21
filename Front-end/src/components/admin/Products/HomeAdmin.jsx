import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "../HomeAdmin.scss";
// import logo from "../../../assets/Group 11/image 20.png";
import { useState, useEffect } from "react";
import { dataProductsAdmin } from "../../../redux/api/apiProductAdmin";
// import NavbarAdmin from "./NavbarAdmin";

const HomeAdmin = (props) => {
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  useEffect(() => {
    dataProductsAdmin(dispatch, token);
  }, [dispatch, token]);
  return (
    <>
      <div className="HomePage-admin">
        <div className="Container-admin">
          <div>Home Admin Container</div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
