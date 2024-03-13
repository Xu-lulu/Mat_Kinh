import { useSelector, useDispatch } from "react-redux";
import CreateProduct from "./CreateProduct";
import Update from "./update";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../HomeAdmin.scss";
import "../productsAdmin.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { deleteProduct } from "../../../redux/api/apiProductAdmin";
import { useEffect, useState } from "react";
import Model from "../../../middleware/Model";
// import { dataProductsAdmin } from "../../../redux/api/apiProductAdmin";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Bạn có chắc chắn muốn xóa không?";
  const textheader = "Delete";
  const textfooter = "Xóa";
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  // const [alldataProducts, setdataProducts] = useState([]);

  // useEffect(() => {
  //   const dataProducts = useSelector(
  //     (state) => state.admin.allproductAdmin.dataProductsAdmin
  //   );
  //   setdataProducts(dataProducts);
  // }, [dispatch]);
  const alldataProducts = useSelector(
    (state) => state.products.allproduct.dataProducts
  );

  const handleDelete = async (id) => {
    // event.preventDefault();

    deleteProduct(dispatch, id, navigate, token);
  };
  // console.log("data", alldataProducts);
  return (
    <>
      <div className="Container-Admin-product">
        <h3>Admin</h3>
        <div className="d-flex justify-content-end">
          <NavLink
            className="btn btn-success create-product-button"
            to="/createProduct"
          >
            <FontAwesomeIcon className="iconadd" icon={faPlus} />
            Thêm sản phẩm
          </NavLink>
        </div>

        <div className="admin-container-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá tiền</th>
                <th scope="col">Chi tiết sản phẩm</th>
                <th className="category" scope="col">
                  Danh mục
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {alldataProducts.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">
                      <img
                        className="admin-item-img"
                        src={`http://localhost:3000/` + item.Image}
                        alt=""
                      ></img>
                    </th>
                    <td>
                      <p className="Admin-item">{item.Name}</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Price} VNĐ</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Description}</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Category}</p>
                    </td>
                    <td>
                      <div className="Admin-item">
                        {/* <button
                          className="amount-btn"
                          // onClick={() => handcleclinkRemove(item._id)}
                        >
                          {/* <FontAwesomeIcon icon={faTrashCan} /> */}
                        {/* Edit */}
                        {/* </button> */}
                        <Link className="admin-edit" to={`/edit/${item._id}`}>
                          Edit
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="admin-delete-btn">
                        <Model
                          className="Create-submit"
                          handleSubmit={handleDelete}
                          textheader={textheader}
                          textbody={text}
                          textfooter={textfooter}
                          id={item._id}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        {/* <table>
          <thead>
            <tr>
              <th scope="col">Ảnh</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Chi tiết</th>
              <th scope="col">Danh mục</th> */}
        {/* <th>Số lượng</th> */}
        {/* </tr>
          </thead>
          <tbody>
            {alldataProducts.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td scope="row"></td>
                  <td scope="row">{item.Name} </td>
                  <td scope="row">{item.Price} VND </td>
                  <td scope="row">{item.Description} </td>
                  <td scope="row">{item.Category} </td>
                  <td scope="row">{item.count} </td>
                  <td scope="row" className="button">
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
        </table> */}
      </div>
    </>
  );
};
export default HomeProducts;
