import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import {
  NavbarFood,
  FooterFood,
  NavbarAdminHidden,
} from "./middleware/NavFood";
import axios from "axios";
import { CartContext } from "./Contexts/CartContext";
import PublicRoute from "./routes/public";
import Admin from "./routes/admin";
import { dataCategorys, dataProducts } from "./redux/api/apiProduct";
import { Layout, Flex } from "antd";
const { Header, Footer, Sider, Content } = Layout;
//
function App() {
  // const [allProducts, setallProducts] = useState([]);
  const [myCart, addtoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [showlogin, setshowlogin] = useState(false);
  const [datalogin, setdatalogin] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dataProducts(dispatch);
    dataCategorys(dispatch);
  }, [dispatch]);
  const user = useSelector((state) => {
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser?.newUsers?.role) {
      return currentUser?.newUsers?.role;
    }
    return null;
  });
  return (
    <CartContext.Provider
      value={{
        myCart,
        addtoCart,
        total,
        setTotal,
        count,
        setCount,
        datalogin,
        setdatalogin,
      }}
    >
      {user === "admin" ? (
        <Router>
          <div className="admin">
            <div className="NavbarAdmin">
              <NavbarAdminHidden />
            </div>
            <div className="page-container-admin">
              <Admin />
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <Flex gap="middle" wrap="wrap">
            <Header>
              <NavbarFood />
            </Header>
            <Content>
              <PublicRoute />
            </Content>
            <Footer>
              <FooterFood />
            </Footer>
          </Flex>
          {/* <div className="User">
            <div className="Navbar-users">
              <NavbarFood />
            </div>
            <div className="page-container-user">
              <PublicRoute />
            </div>
            <div className="Footer-users">
              <FooterFood />
            </div>
          </div> */}
        </Router>
      )}
    </CartContext.Provider>
  );
}
//
export default App;
