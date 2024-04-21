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
import { datarole, datauser, usedataCart } from "../../common/dataReux";
import Bank from "../../assets/animation/Bank.json";
import account from "../../assets/animation/account.json";
import Lottie from "lottie-react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
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
    if (token && role === "user") {
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
  const handleClickUser = () => {
    setshow(!show);
  };
  const items = [
    {
      key: "1",
      label: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            <Lottie
              style={{ width: "50px" }}
              animationData={account}
              loop={true}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              {user?.username}
            </a>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        // <a
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   href="https://www.antgroup.com"
        //   style={{ textDecoration: "none" }}
        // >
        //   Cấp quyền lên người bán hàng
        // </a>
        <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
          Cấp quyền lên người bán
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        // <a
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   href="https://www.antgroup.com"
        // >
        //   Đăng xuất
        // </a>
        <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
          Đăng Xuất
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <div className="nav-container">
        <a className="logo">
          {/* <img src={logo} alt="logo"></img> */}
          <div className="logo__animation">
            <Lottie animationData={Bank} loop={true} />
          </div>
          {/* <Animation data={Bank} /> */}
          <div className="logo__text">
            <h1>Food Love</h1>
            <h1>Food Love</h1>
            <h1>Food Love</h1>
          </div>
        </a>
        <nav className="Navbar">
          {role === "user" || role === null ? (
            <>
              <div className="Navbar__Menu">
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
              <div className="Navbar__Cart-like-account">
                <NavLink to="/myCart" className="btn btncart">
                  {/* <FontAwesomeIcon icon={faCartArrowDown} /> */}
                  {role === "user" ? (
                    <>
                      {" "}
                      {/* <div className="count">{totalMount}</div> */}
                      <Badge count={totalMount}>
                        {/* <ShoppingCartOutlined /> */}
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faCartArrowDown}
                        />
                      </Badge>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* <div className="count">{totalMount}</div> */}
                      <Badge count={totalMount} showZero>
                        {/* <ShoppingCartOutlined /> */}
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faCartArrowDown}
                        />
                      </Badge>
                    </>
                  )}
                </NavLink>
                <NavLink to="/like" className="btn">
                  <FontAwesomeIcon icon={faHeart} />
                </NavLink>
                {user ? (
                  <>
                    <Dropdown
                      // overlayClassName="header-account"
                      trigger={["click"]}
                      placement="bottomRight"
                      menu={{ items }}
                      className="Dropdown"
                      overlayClassName="DropdowAccount"
                    >
                      <UserOutlined
                        className="LogoAccount"
                        style={{ fontSize: "30px" }}
                      />
                    </Dropdown>
                    <h5 className="text">Tài khoản</h5>
                    {/* <Dropdown.Button
                className="btn"
                // menu={user.username}
                placement="bottom"
                icon={<UserOutlined />}
              >
                {user.username}
              </Dropdown.Button> */}
                    {/* <NavLink className="btn">{user.username}</NavLink>
                    <NavLink
                      to="/Login"
                      className="btn"
                      onClick={handleClickLogout}
                    >
                      Đăng Xuất
                    </NavLink> */}
                  </>
                ) : (
                  <>
                    <NavLink to="/Register" className="btn">
                      Đăng ký
                    </NavLink>
                    <NavLink to="/Login" className="btn">
                      Đăng nhập
                    </NavLink>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="cenNavbar">
                {
                  <>
                    <NavLink to="/admin" className="btn">
                      {user.username}
                    </NavLink>
                    {/* <NavLink
                      to="/Login"
                      className="btn"
                      onClick={handleClickLogout}
                    >
                      Đăng Xuất
                    </NavLink> */}
                  </>
                }
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
// {
//   user ? (
//     <>
//       {/* <>
//                 <Dropdown
//                   // overlayClassName="header-account"
//                   trigger={["click"]}
//                   placement="bottomRight"
//                   menu={{ items }}
//                   overlayClassName="DropdowAccount"
//                 >
//                   <UserOutlined className="LogoAccount" style={{ fontSize: "30px" }} />
//                 </Dropdown>
//                 <p className="text">Tài khoản</p>
//               </> */}
//       {/* <Dropdown.Button
//                 className="btn"
//                 // menu={user.username}
//                 placement="bottom"
//                 icon={<UserOutlined />}
//               >
//                 {user.username}
//               </Dropdown.Button> */}
//       {/* <NavLink className="btn">{user.username}</NavLink>
//               <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
//                 Đăng Xuất
//               </NavLink> */}
//     </>
//   ) : (
//     <>
//       {/* <NavLink to="/Register" className="btn">
//                 Đăng ký
//               </NavLink>
//               <NavLink to="/Login" className="btn">
//                 Đăng nhập
//               </NavLink> */}
//     </>
//   );
// }
export default Navbars;
