import { useSelector, useDispatch } from "react-redux";
// import CreateProduct from "./CreateProduct";
// import Update from "./update";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../HomeAdmin.scss";
import "../../productsAdmin.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Model from "../../../../middleware/Model";
import { deleteCategory } from "../../../../redux/api/apiCategoryAdmin";

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Bạn có chắc chắn muốn xóa không?";
  const textheader = "Delete";
  const textfooter = "Xóa";
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  const alldataCategorys = useSelector(
    (state) => state.products.categorys.dataCategorys
  );

  const handleDelete = async (id) => {
    deleteCategory(dispatch, id, navigate, token);
  };
  return (
    <>
      <div className="Container-Admin-product">
        <h3>Admin</h3>
        <div className="d-flex justify-content-end">
          <NavLink
            className="btn btn-success create-product-button"
            to="/createCategory"
          >
            <FontAwesomeIcon className="iconadd" icon={faPlus} />
            Thêm danh mục
          </NavLink>
        </div>

        <div className="admin-container-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên danh mục</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {alldataCategorys.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>
                      <p className="Admin-item">{item.Namecategory}</p>
                    </td>
                    <td>
                      <div className="Admin-item">
                        <Link className="admin-edit" to={`/editcategory/${item._id}`}>
                          Edit
                        </Link>
                      </div>
                    </td>
                    <td>
                      {/* <div className="admin-delete-btn"> */}
                        <Model
                          className="Create-submit"
                          handleSubmit={handleDelete}
                          textheader={textheader}
                          textbody={text}
                          textfooter={textfooter}
                          id={item._id}
                        />
                      {/* </div> */}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};
export default CategoryAdmin;
