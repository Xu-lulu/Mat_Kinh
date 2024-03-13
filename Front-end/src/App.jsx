import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
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
  const token = useSelector(
    (state) => state.auth?.login?.currentUser?.accessToken
  );

  // useEffect(() => {
  dataProducts(dispatch);
  dataCategorys(dispatch);
  // }, [dispatch]);
  // const alldataProducts = useSelector(
  //   (state) => state.products.allproduct.dataProducts
  // );
  // console.log(alldataProducts);
  // const dataCategory = useSelector(
  //   (state) => state.products.categorys.dataCategorys
  // );
  // console.log(dataCategory);
  const user = useSelector((state) => {
    // const currentUsers = state.auth.login.currentUser.newUsers;
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser.newUsers.role) {
      return currentUser.newUsers.role;
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

          {/* <FooterFood /> */}
        </Router>
      ) : (
        <Router>
          <NavbarFood />
          {/* <div className="Navbar">
          <Navbars />
        </div> */}
          <div className="page-container-user">
            <PublicRoute />
            {/* <div className="Footer">
            <Footer />
          </div> */}
          </div>
          <FooterFood />
        </Router>
      )}
    </CartContext.Provider>
  );
}
//
export default App;
