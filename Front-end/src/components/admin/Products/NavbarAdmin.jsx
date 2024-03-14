import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "../HomeAdmin.scss";
import logo from "../../../assets/Group 11/image 20.png";

import { useState, useEffect } from "react";
import { purgeStoredData } from "../../../redux/purge";
//
export const NavbarAdmin = (props) => {
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {}, []);

  // const handleDelete = async (id) => {
  //   await axios
  //     .delete("http://localhost:3000/delete/" + `${id}`)
  //     .then((res) => {
  //       toast.success("Xóa thành công!");
  //       navigate("/admin");
  //     })
  //     .catch((err) => toast.error(err.response.data.mes));
  // };
  return (
    <>
      <div className="HomeAdmin">
        <div className="Menu-Admin">
          <a className="logo">
            <img src={logo} alt="logo"></img>
            <p>Food Love</p>
          </a>

          <div className="nav flex-column">
            <NavLink
              className="nav-link active btn"
              aria-current="page"
              href="#"
              to="/admin"
            >
              Trang chủ
            </NavLink>
            <NavLink to="/productadmin" className="nav-link btn" href="#">
              Sản Phẩm
            </NavLink>
            <NavLink to="/categoryadmin" className="nav-link btn" href="#">
              Danh mục
            </NavLink>
            <NavLink className="nav-link btn" href="#">
              Khách hàng
            </NavLink>
            <NavLink className="nav-link btn" aria-disabled="true">
              Hóa đơn
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export const NavbarAdminLogout = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(purgeStoredData());
  };
  const user = useSelector((state) => {
    // const currentUsers = state.auth.login.currentUser.newUsers;
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser.newUsers) {
      return currentUser.newUsers;
    }
    return null;
  });
  return (
    <>
      <div className="NavbarLogout">
        <NavLink className="btn">{user.username}</NavLink>
        <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
          Đăng Xuất
        </NavLink>
      </div>
    </>
  );
};

// export default NavbarAdmin;
