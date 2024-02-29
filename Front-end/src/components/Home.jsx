import { useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" name="name">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Tìm kiếm
        </button>
      </form>
      <>
        {checkdata() ? (
          <p>không tìm thấy sản phẩm</p>
        ) : (
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
                      {/* <td>
                    <img
                      src={`http://localhost:3000/` + item.Image}
                      alt={`picture of: ${item.Name}`}
                    />
                  </td> */}
                      <td>{item.Name} </td>
                      <td>{item.Price} VND </td>
                      <td>{item.Description} </td>
                      <td>{item.Category} </td>
                      <td>{item.count} </td>
                      <td>
                        {/* <Link
                      className="btn mx-2 btn-success"
                      to={`/read/${item._id}`}
                    >
                      Read
                    </Link> */}
                        <Link
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
      </>
    </>
  );
};

export default Home;
