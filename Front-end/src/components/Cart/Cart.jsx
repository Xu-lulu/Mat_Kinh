import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { useSelector } from "react-redux";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCartShopping,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import ProductsCart from "../Products/ProductCard";
const Cart = (props) => {
  const { myCart, addtoCart, total, setTotal, count, setCount } =
    useContext(CartContext);
  // const dataCart = useSelector(
  //   (state) => state.auth.login.currentUser.newUsers.cart
  // );
  // console.log(dataCart);
  const dataCart = myCart;
  const alldataProducts = useSelector(
    (state) => state.products.allproduct.dataProducts
  );
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setitemOffset] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, alldataProducts]);

  const handcleclinkIncrement = (id) => {
    const index = myCart.findIndex((item) => item._id === id);
    const cartNewState = [...myCart];
    cartNewState[index].mount++;
    addtoCart(cartNewState);
    setTotal((totals) => (totals += Number(cartNewState[index].Price)));
    setCount((count) => (count += 1));
  };
  const handcleclinkDecrement = (id) => {
    const index = myCart.findIndex((item) => item._id === id);
    if (myCart[index].mount > 1) {
      const cartNewState = [...myCart];
      cartNewState[index].mount--;
      addtoCart(cartNewState);
      setTotal((totals) => (totals -= Number(cartNewState[index].Price)));
      setCount((count) => (count -= 1));
    }
  };
  const isCartEmpty = () => {
    return dataCart.length === 0;
  };
  const handcleclinkRemove = (id) => {
    const newStatemyCart = myCart.filter((item) => item._id != id);
    const removemyCart = myCart.find((item) => item._id === id);
    addtoCart(newStatemyCart);
    setTotal((totals) => (totals -= removemyCart.Price * removemyCart.mount));
    setCount((count) => count - removemyCart.mount);
  };
  return (
    <>
      <div className="Cart">
        {isCartEmpty() ? (
          <>
            <div className="No-cart">
              <FontAwesomeIcon icon={faCartShopping} className="iconNocart" />
              <p>Giỏ hàng trống</p>
            </div>
            <div className="Nocart-container">
              <p>Có thể bạn cũng thích</p>
              <NavLink className="allproduct" to={`/product`}>
                Xem tất cả{" "}
                <FontAwesomeIcon
                  className="icon-faAngles"
                  icon={faAnglesRight}
                />
              </NavLink>
            </div>
            <div className="allproduct-cart">
              <div className="alldataproduct row row-cols-5 gy-1">
                {currentItems.map((product, index) => {
                  return (
                    <div className="product-card p-1" key={index}>
                      <ProductsCart
                        _id={product._id}
                        Name={product.Name}
                        Price={product.Price}
                        Description={product.Description}
                        Image={product.Image}
                        Count={product.count}
                        Category={product.Category}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="Cart-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {dataCart.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">
                          <img
                            className="cart-item-img"
                            src={`http://localhost:3000/` + item.Image}
                            alt=""
                          ></img>
                        </th>
                        <td>
                          <p className="Cart-right">{item.Name}</p>
                        </td>
                        <td>
                          <p className="Cart-right">{item.Price} VNĐ</p>
                        </td>
                        <td>
                          <div className="Cart-right">
                            <div>
                              <button
                                className="amount-btn amount-de"
                                onClick={() => handcleclinkDecrement(item._id)}
                              >
                                {" "}
                                -
                              </button>
                            </div>
                            <h5>{item.mount}</h5>
                            <div>
                              <button
                                className="amount-btn amount-in"
                                onClick={() => handcleclinkIncrement(item._id)}
                              >
                                {" "}
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="Cart-right">
                            <button
                              className="amount-btn delete-item-cart"
                              onClick={() => handcleclinkRemove(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="pay">
                <div className="pay1">
                  <p>Số sản phẩm: </p>
                  <p>{count}</p>
                </div>
                <div className="pay2">
                  <p>Tổng tiền: </p>
                  <p>{total} VNĐ</p>
                </div>
              </div>
            </div>

            <div className="Nocart-container">
              <p>Có thể bạn cũng thích</p>
              <NavLink className="allproduct" to={`/products`}>
                Xem tất cả{" "}
                <FontAwesomeIcon
                  className="icon-faAngles"
                  icon={faAnglesRight}
                />
              </NavLink>
            </div>
            <div className="allproduct-cart">
              <div className="alldataproduct row row-cols-5 gy-1">
                {currentItems.map((product, index) => {
                  return (
                    <div className="product-card p-1" key={index}>
                      <ProductsCart
                        _id={product._id}
                        Name={product.Name}
                        Price={product.Price}
                        Description={product.Description}
                        Image={product.Image}
                        Count={product.count}
                        Category={product.Category}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
