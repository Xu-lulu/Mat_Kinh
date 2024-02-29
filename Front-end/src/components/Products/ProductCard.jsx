import { NavLink } from "react-router-dom";
// import DetailProduct from "./detailProduct";
import "./Productscard.scss";
const ProductCard = (props) => {
  const { _id, Name, Price, Description, Image, count, Category } = props;
  return (
    <>
      <div className="card">
        <div className="card_image">
          <img
            src={`http://localhost:3000/` + Image}
            alt={`picture of: ${Name}`}
          />
        </div>
        <div className="card_info">
          <h2>{Name}</h2>
          <h3>{Price}VND</h3>
          <div className="productsDetail">
            <NavLink to={`/detail/${_id}`} className="btn">
              Xem chi tiết
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
