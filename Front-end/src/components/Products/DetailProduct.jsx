import { useState, useContext } from "react";
import "./Products.scss";
import { CartContext } from "../../Contexts/CartContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const DetailProduct = (props) => {
  const { id } = useParams();
  const { allProducts } = props;
  const [add, setadd] = useState(0);

  const { myCart, addtoCart, setTotal, count, setCount } =
    useContext(CartContext);
  const dataDetail = allProducts.find((item) => item._id === id);
  const handleAdd = () => {
    const newItem = {
      _id: dataDetail._id,
      Name: dataDetail.Name,
      Price: dataDetail.Price,
      Image: dataDetail.Image,
      count: dataDetail.count,
      Category: dataDetail.Category,
      mount: 1,
    };
    const checkid = myCart.find((item) => item._id === newItem._id);
    if (checkid) {
      checkid.mount++;
      setCount((add) => (add += 1));
    } else {
      addtoCart((item) => [...item, newItem]);
      setCount((add) => (add += 1));
    }
    setTotal((total) => (total += Number(dataDetail.Price)));
    toast.success("Đã thêm sản phẩm vào giỏ hàng", {
      position: "bottom-right",
      autoClose: 120,
    });
  };
  console.log(count);
  return (
    <>
      <section className="products">
        <div className="productsName">
          <p>{dataDetail.Name}</p>
        </div>
        <div className="products-Image-container">
          <img
            className="products-Image"
            src={`http://localhost:3000/` + dataDetail.Image}
            alt={`picture of: ${dataDetail.Name}`}
          />
        </div>
        <div className="productsPrice">
          <p>{dataDetail.Price}</p>
        </div>
        <div className="productsDescription">
          <p>{dataDetail.Description}</p>
        </div>
        {/* <div className="productsCount">
          <p>{dataDetail.count} đôi</p>
        </div> */}
        <button className="products-btn" onClick={handleAdd}>
          Thêm vào giỏ hàng
        </button>
      </section>
    </>
  );
};

export default DetailProduct;
