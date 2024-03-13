import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "../HomeAdmin.scss";
// import logo from "../../../assets/Group 11/image 20.png";
import { useState, useEffect } from "react";
import { dataProductsAdmin } from "../../../redux/api/apiProductAdmin";
// import NavbarAdmin from "./NavbarAdmin";

const HomeAdmin = (props) => {
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  useEffect(() => {
    dataProductsAdmin(dispatch, token);
  }, [dispatch, token]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = useSelector(
  //       (state) => state.auth.login.currentUser.accessToken
  //     );
  //     await dataProductsAdmin(dispatch, token);
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const handleDelete = async (id) => {
  //   await axios
  //     .delete("http://localhost:3000/delete/" + `${id}`)
  //     .then((res) => {
  //       toast.success("Xóa thành công!");
  //       navigate("/admin");
  //     })
  //     .catch((err) => toast.error(err.response.data.mes));
  // };
  return (
    <>
      <div className="HomePage-admin">
        <div className="Container-admin">
          <div>Home Admin Container</div>
        </div>
      </div>
      {/* <div className="Container-Admin">
          <h3>Admin</h3> */}
      {/* vh-100 vw-90 */}
      {/* <div className="d-flex justify-content-end">
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
              {alldataProducts.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{item.Name} </td>
                    <td>{item.Price} VND </td>
                    <td>{item.Description} </td>
                    <td>{item.Category} </td>
                    <td>{item.count} </td>
                    <td className="button">
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
        </div> */}
    </>
  );
};

export default HomeAdmin;
