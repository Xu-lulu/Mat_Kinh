import { Link, NavLink } from "react-router-dom";
// import DetailProduct from "./detailProduct";
import { useNavigate } from "react-router-dom";
import "./Productscard.scss";

const ProductCard = (props) => {
  const { _id, Name, Price, Description, Image, count, Category } = props;
  const navigation = useNavigate();
  const handleclickDetail = () => {
    navigation(`/detail/${_id}`);
  };
  return (
    <>
      <div className="card" onClick={handleclickDetail}>
        <div className="card_image">
          <img
            src={`http://localhost:3000/` + Image}
            alt={`picture of: ${Name}`}
          />
        </div>
        <div className="card_info">
          <h2>{Name}</h2>
          <h3>{Price}VND</h3>
          <div className="productsCard">
            <Link
              to={`/detail/${_id}`}
              className="btn"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
