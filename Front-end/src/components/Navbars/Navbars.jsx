import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbars.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../assets/Group 11/image 20.png";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../../redux/api/apiRequest";
import { purgeStoredData } from "../../redux/purge";
const Navbars = () => {
  const { count, setcount } = useContext(CartContext);
  const [dataCategory, setdataCategory] = useState([]);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    // const currentUsers = state.auth.login.currentUser.newUsers;
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser.newUsers) {
      return currentUser.newUsers;
    }
    return null;
  });
  const role = useSelector((state) => {
    const currentUser = state.auth.login.currentUser;

    if (currentUser && currentUser.newUsers.role) {
      return currentUser.newUsers.role;
    }
    return null;
  });
  dispatch(purgeStoredData);
  // const accessToken = user?.accessToken;
  // const id = user?._id;
  // const countCart = useSelector((item) => item.cart.dataCart.dataCart || []);
  // const count = () => {
  //   return countCart.reduce((total, item) => total + item.mount, 0);
  // };
  const handleClickLogout = () => {
    // logoutUser(dispatch, id, navigate, accessToken);
    dispatch(purgeStoredData());
  };
  return (
    <>
      <div className="nav-container">
        <a className="logo">
          <img src={logo} alt="logo"></img>
          <h1>Food Love</h1>
        </a>
        <nav className="navbar">
          {role === "user" || role === null ? (
            <>
              <div className="cenNavbar">
                <NavLink to="/" active="active" className="btn">
                  Trang chủ
                </NavLink>

                <NavLink to="/products" className="btn">
                  Danh sách món
                </NavLink>
                <NavLink to="/blog" className="btn">
                  Blog
                </NavLink>
              </div>
              <NavLink to="/myCart" className="btn btncart">
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  <div className="count">{count}</div>
                {/* <FontAwesomeIcon icon={faCartArrowDown} />
                {role === "user" ? (
                  <>
                    {" "}
                    <div className="count">0</div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="count">0</div>
                  </>
                )} */}
              </NavLink>
              <NavLink to="/like" className="btn">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </>
          ) : (
            <>
              <div className="cenNavbar">
                {
                  <>
                    <NavLink to="/admin" className="btn">
                      {user.username}
                    </NavLink>
                    <NavLink
                      to="/Login"
                      className="btn"
                      onClick={handleClickLogout}
                    >
                      Đăng Xuất
                    </NavLink>
                  </>
                }
              </div>
            </>
          )}

          {user ? (
            <>
              <NavLink className="btn">{user.username}</NavLink>
              <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
                Đăng Xuất
              </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink to="/Register" className="btn">
                Đăng ký
              </NavLink>
              <NavLink to="/Login" className="btn">
                Đăng nhập
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {}
    </>
  );
};

export default Navbars;
