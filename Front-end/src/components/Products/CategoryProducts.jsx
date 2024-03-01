import { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import ProductsCart from "./ProductCard";
import "./Products.scss";
import BanerProducts from "../baner/banerProducts";
const CategoryProducts = (props) => {
  const { allProducts } = props;
  const { name } = useParams();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [dataCategory, setdataCategory] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await axios.post(
        "http://localhost:3000/products/category/" + `${name}`
      );
      return res;
    }
    getData().then((res) => setdata(res.data));
    getData().then((res) => setloading(false));
    getData().catch((err) => console.log(err));
  }, [name]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:3000/allCategory");
      return res;
    }
    getData().then((res) => setdataCategory(res.data));
    getData().catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="product">
        <BanerProducts></BanerProducts>
        <div>
          <nav className="navbarpro">
            <Link exact={true} className="btn" to="/products" active="active">
              {" "}
              All
            </Link>
            {dataCategory.map((item, index) => {
              return (
                <NavLink
                  className="btn"
                  key={index}
                  to={`/products/category/${item.Namecategory}`}
                  active="active"
                >
                  {item.Namecategory}
                </NavLink>
              );
            })}
          </nav>{" "}
        </div>
        <div>
          {!loading ? (
            <div className="row row-cols-4 gy-1 p-5">
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
export default CategoryProducts;
