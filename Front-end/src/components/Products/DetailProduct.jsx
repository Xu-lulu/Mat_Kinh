import { useState, useContext, useEffect } from "react";
import "./Products.scss";
import { CartContext } from "../../Contexts/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductsCart from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { findCategorys } from "../../redux/api/apiProduct";
const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setadd] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const { myCart, addtoCart, setTotal, count, setCount, datalogin } =
    useContext(CartContext);
  const alldataProducts = useSelector(
    (state) => state.products.allproduct.dataProducts
  );
  const dataDetail = alldataProducts.find((item) => item._id === id);
  const navigate = useNavigate();
  console.log(dataDetail.Category)
  useEffect(() => {
    findCategorys(dispatch, dataDetail.Category);
  }, [dataDetail.Category]);
  const datafincategory = useSelector(
    (state) => state.products.findcategorys.finddataCategorys
  );
  // console.log(datafincategory);
  const user = useSelector((state) => {
    // const currentUsers = state.auth.login.currentUser.newUsers;
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser.newUsers) {
      return currentUser.newUsers;
    }
    return null;
  });
  const handleAdd = () => {
    if (user) {
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
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } else {
      navigate("/Login");
    }
  };
  return (
    <>
      <div>
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
            {datafincategory? (
              <div className="alldataproduct row row-cols-4 gy-1 p-5">
                {datafincategory.map((product, index) => {
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
      </div>
    </>
  );
};

export default DetailProduct;
