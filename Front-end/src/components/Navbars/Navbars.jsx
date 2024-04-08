import { NavLink, useNavigate } from "react-router-dom";
import "./Navbars.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Group 11/image 20.png";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { purgeStoredData } from "../../redux/purge";
import { dataCart } from "../../redux/api/apiAddtoCart";
import { Badge, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { datarole, datauser, usedataCart } from "../../middleware/dataReux";
const Navbars = () => {
  const [dataCategory, setdataCategory] = useState([]);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [totalMount, settotalMount] = useState(0);
  const dispatch = useDispatch();
  const user = datauser();
  const role = datarole();
  // dispatch(purgeStoredData);
  const handleClickLogout = () => {
    // logoutUser(dispatch, id, navigate, accessToken);
    dispatch(purgeStoredData());
    navigate("/Login");
  };
  const token = useSelector(
    (state) => state?.auth?.login?.currentUser?.accessToken
  );
  const dataCartUser = usedataCart();
  useEffect(() => {
    if (token) {
      dataCart(dispatch, token);
    }
  }, [dispatch, token]);
  useEffect(() => {
    if (user && dataCartUser) {
      const sumMount = dataCartUser.reduce((acc, currentItem) => acc + 1, 0);
      settotalMount(sumMount);
    } else {
      settotalMount(0);
    }
  }, [dataCartUser]);
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
                {/* <FontAwesomeIcon icon={faCartArrowDown} /> */}
                {/* <div className="count">{count}</div> */}
                <FontAwesomeIcon icon={faCartArrowDown} />
                {role === "user" ? (
                  <>
                    {" "}
                    <div className="count">{totalMount}</div>
                    {/* <Badge count={totalMount}>
                      <ShoppingCartOutlined />
                    </Badge> */}
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="count">{totalMount}</div>
                    {/* <Badge count={totalMount} showZero>
                      <ShoppingCartOutlined />
                    </Badge> */}
                  </>
                )}
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
