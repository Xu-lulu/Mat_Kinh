import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./HomeAdmin.scss";
import CreateProduct from "./CreateProduct";
import Update from "./update";
import { useState, useEffect } from "react";
//
const HomeAdmin = (props) => {
  const { allProducts } = props;
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3000/delete/" + `${id}`)
      .then((res) => toast.success("Xóa thành công!"))
      .then((res) => navigate("/admin"))
      .catch((err) => console.log(err));
  };
  // const handleEdit = (id) => {
  // const data = allProducts.find((item) => item._id === id);
  // console.log("data", data);
  // setdataUpdate(data);
  // dataUpdate.push(data);
  // console.log("dataset", dataUpdate);

  // <Update dataup={dataUpdate} />;
  // };
  return (
    <>
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
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((item, index) => {
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
    </>
  );
};

export default HomeAdmin;
