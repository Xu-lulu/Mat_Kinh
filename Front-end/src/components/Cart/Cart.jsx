import { useContext, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Cart = (props) => {
  const { myCart, addtoCart, total, setTotal, count, setcount } =
    useContext(CartContext);
  // const [data, setdata] = useState(0);
  const handcleclinkIncrement = (id) => {
    const index = myCart.findIndex((item) => item._id === id);
    const cartNewState = [...myCart];
    cartNewState[index].mount++;
    addtoCart(cartNewState);
    setTotal((totals) => (totals += Number(cartNewState[index].Price)));
    // setcount((count) => (count += 1));
  };
  const handcleclinkDecrement = (id) => {
    const index = myCart.findIndex((item) => item._id === id);
    if (myCart[index].mount > 1) {
      const cartNewState = [...myCart];
      cartNewState[index].mount--;
      addtoCart(cartNewState);
      setTotal((totals) => (totals -= Number(cartNewState[index].Price)));
      // setcount((count) => (count -= 1));
    }
  };
  const isCartEmpty = () => {
    return myCart.length === 0;
  };
  const handcleclinkRemove = (id) => {
    const newStatemyCart = myCart.filter((item) => item._id != id);
    const removemyCart = myCart.find((item) => item._id === id);
    addtoCart(newStatemyCart);
    setTotal((totals) => (totals -= removemyCart.Price * removemyCart.mount));
    // setcount((count) => count - myCart.mount);
    useEffect(() => {}, []);
  };
  return (
    <>
      {isCartEmpty() ? (
        <p>giỏ hàng trống</p>
      ) : (
        <section className="cart-container">
          <div className="cart-header">My Cart:</div>
          <div className="cart-items">
            {myCart.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <img
                    className="cart-item-img"
                    src={`http://localhost:3000/` + item.Image}
                    alt=""
                  ></img>
                  {item.Name}:{item.Price} VND
                  <button
                    className="amount-btn"
                    onClick={() => handcleclinkDecrement(item._id)}
                  >
                    -
                  </button>
                  <h1>{item.mount}</h1>
                  <button
                    className="amount-btn"
                    onClick={() => handcleclinkIncrement(item._id)}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <br />
                  <button
                    className="amount-btn"
                    onClick={() => handcleclinkRemove(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              );
            })}
            <div className="cart-total">Tổng tiền: {total} VND</div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
