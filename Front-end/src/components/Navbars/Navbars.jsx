import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbars.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../assets/Group 11/image 20.png";
const Navbars = () => {
  const { count, setcount } = useContext(CartContext);
  const [dataCategory, setdataCategory] = useState([]);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:3000/allCategory");
      return res;
    }
    getData().then((res) => setdataCategory(res.data));
    getData().catch((err) => console.log(err));
  }, []);
  const clickproduct = () => {
    useEffect(() => {
      if (
        location.pathname === "/products" ||
        location.pathname === "/category/"
      ) {
        setshow(true);
      } else {
        setshow(false);
      }
    }, [location.pathname]);
  };
  // const handleclick = () => {
  //   navigate("/products");
  // };
  const rendeclink = () => {
    useEffect(() => {}, []);
  };
  return (
    <>
      <div className="nav-container">
        <a className="logo">
          <img src={logo} alt="logo"></img>
          <h1>Food Love</h1>
        </a>

        <nav className="navbar">
          <div className="cenNavbar">
            <NavLink to="/" active="active" className="btn">
              Home
            </NavLink>
            <NavLink to="/admin" className="btn">
              Admin
            </NavLink>
            <NavLink to="/products" className="btn" onClick={clickproduct()}>
              Products
            </NavLink>
          </div>
          <NavLink to="/myCart" className="btn btncart">
            <FontAwesomeIcon icon={faCartArrowDown} /> 
            <div className="count">{count}</div>
          </NavLink>
          <NavLink to="/like" className="btn">
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>
          <NavLink to="/Signout" className="btn">
            Đăng ký
          </NavLink>
          <NavLink to="/Signin" className="btn">
            Đăng nhập
          </NavLink>
        </nav>
      </div>
      
      {/* {show && (
        <nav>
          <NavLink className="btn" to="/products" active="active">
            {" "}
            All
          </NavLink>
          {dataCategory.map((item, index) => {
            return (
              <NavLink
                className="btn"
                key={index}
                to={`category/${item.Namecategory}`}
                active="active"
                onClick={rendeclink}
              >
                {item.Namecategory}
              </NavLink>
            );
          })}
        </nav> */}
      {/* )} */}
    </>
  );
};

export default Navbars;
