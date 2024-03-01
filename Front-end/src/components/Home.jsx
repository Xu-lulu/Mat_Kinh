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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/search/" + `${name}`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  };
  const checkdata = () => {
    return data.length === 0;
  };
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3000/delete/" + `${id}`)
      .then((res) => toast.success("Xóa thành công!"))
      .then((res) => navigate("/admin"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="HomeContainer">
        <div className="imageContainer">
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
        <div className="baner-container">
          <img src={baner1} alt="baner1"></img>
          <img src={baner2} alt="baner2"></img>
          <img src={baner3} alt="baner3"></img>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit} className="form-search">
        <div className="search">
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <>
        {!checkdata() && (
          <div className="container-fluid vh-100 vw-90">
            <h3>Admin</h3>
            <div className="d-flex justify-content-end">
              <NavLink className="btn btn-success" to="/createProduct">
                Thêm sản phẩm
              </NavLink>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Chi tiết</th>
                  <th>Danh mục</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.Name} </td>
                      <td>{item.Price} VND </td>
                      <td>{item.Description} </td>
                      <td>{item.Category} </td>
                      <td>{item.count} </td>
                      <td> */}
      {/* <Link
                          className="btn mx-2 btn-success"
                          to={`/edit/${item._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn mx-2 btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </> */}
    </>
  );
};

export default Home;
