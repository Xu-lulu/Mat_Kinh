import { useState, useContext, useEffect } from "react";
import "./Products.scss";
import { CartContext } from "../../Contexts/CartContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductsCart from "./ProductCard";

const DetailProduct = (props) => {
  const { id } = useParams();
  const { allProducts } = props;
  const [add, setadd] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const { myCart, addtoCart, setTotal, count, setCount } =
    useContext(CartContext);
  const dataDetail = allProducts.find((item) => item._id === id);
  useEffect(() => {
    async function getData() {
      const res = await axios.post(
        "http://localhost:3000/products/category/" + `${dataDetail.Category}`
      );
      return res;
    }
    getData().then((res) => setdata(res.data));
    getData().then((res) => setloading(false));
    getData().catch((err) => console.log(err));
  }, [dataDetail.Category]);
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
  // console.log(count);
  return (
    <>
      <div className="products">
        <div className="products-Image-container">
          <img
            className="products-Image"
            src={`http://localhost:3000/` + dataDetail.Image}
            alt={`picture of: ${dataDetail.Name}`}
          />
        </div>
        <div className="container">
          <div className="container-product">
            <div className="productsCategory">
              <p>Danh mục/{dataDetail.Category}</p>
            </div>
            <div className="productsName">
              <p>{dataDetail.Name}</p>
            </div>
            <div className="productsPrice">
              <p>Giá: {dataDetail.Price}/1 suất</p>
            </div>
            <div className="productsDescription">
              <p>Chi tiết món ăn: {dataDetail.Description}</p>
            </div>
            {/* <div className="productsCount">
          <p>{dataDetail.count} đôi</p>
        </div> */}
          </div>
          <div className="add-cart">
            <button className="products-btn" onClick={handleAdd}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="AllFoodSame">
        <div className="FoodSame">
          <div className="line"></div>
          <p>Món ăn tương ứng</p>
        </div>
        <div className="FoodSame-Product">
          {!loading ? (
            <div className="alldataproduct row row-cols-4 gy-1 p-5">
              {data.map((product, index) => {
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
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
