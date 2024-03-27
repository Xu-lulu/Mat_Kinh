import { useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import baner1 from "../assets/baner1.png";
import baner2 from "../assets/baner2.png";
import baner3 from "../assets/baner3.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BanerProducts from "./baner/banerProducts";
const Home = () => {
  const [name, setname] = useState([]);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post("http://localhost:3000/search/" + `${name}`)
  //     .then((res) => setdata(res.data))
  //     .catch((err) => console.log(err));
  // };
  return (
    <>
      <div className="HomeContainer">
        <div className="imageContainer roboto-thin-italic">
          <h1>Thế giới ẩm thực dành cho bạn</h1>
          <h2>
            Nơi cung cấp đa dạng các món đồ ăn ngon, từ đồ ăn nhanh đến món ngon
            miệng, để bạn có thể thưởng thức mỗi ngày. Đặt hàng ngay hôm nay để
            trải nghiệm sự tiện lợi và ngon miệng!
          </h2>
          <Link to="/products">
            <button>Đặt hàng ngay</button>
          </Link>
        </div>
        <div className="home-baner-container">
          <img src={baner1} alt="baner1"></img>
          <img src={baner2} alt="baner2"></img>
          <img src={baner3} alt="baner3"></img>
        </div>
      </div>
    </>
  );
};

export default Home;
