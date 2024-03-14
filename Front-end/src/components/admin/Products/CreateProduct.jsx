import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataProducts, dataCategorys } from "../../../redux/api/apiProduct";
import { useSelector, useDispatch } from "react-redux";
import HomeAdmin from "./HomeAdmin";
import "../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Model from "../../../middleware/Model";
import { createProduct } from "../../../redux/api/apiProductAdmin";

const CreateProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const text = "Bạn có chắc chắn muốn lưu không?";
  const textheader = "Thêm sản phẩm";
  const textfooter = "Lưu";

  const navgigate = useNavigate();
  const dispatch = useDispatch();
  const dataCategory = useSelector(
    (state) => state.products.categorys.dataCategorys
  );
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  const handleSubmit = async (event) => {
    const addproducts = {
      Name: name,
      Price: price,
      Description: description,
      Image: urlimg,
      count: count,
      Category: category,
    };
    event.preventDefault();
    createProduct(dispatch, navgigate, token, addproducts);
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Thêm Món Ăn</h3>
        <form className="Form-Create-Product">
          <div className="Image-Des">
            <div>
              <label className="form-label" htmlFor="image">
                Chọn ảnh
              </label>
              {selectedImage ? (
                <>
                  <label
                    className="form-label"
                    name="description"
                    htmlFor="image"
                  >
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="selected-image"
                    />
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <>
                  <div className="mb-3 Image-form" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="image">
                      <div className="icon-image">
                        <FontAwesomeIcon icon={faImage} />
                      </div>
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-3 form-des">
              <label className="form-label" name="description">
                Chi tiết sản phẩm
              </label>
              <input
                type="text"
                className="form-control input-create-description"
                name="description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="Form-Name-Price">
            <div className="mb-3 Form-Name">
              <label className="form-label" name="name">
                Tên sản phẩm
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="mb-3 Form-Price">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                name="price"
              >
                Giá
              </label>
              <input
                type="text"
                className="form-control"
                name="price"
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
          </div>
          <div className="Form-Count-Category">
            <div className="mb-3 Form-Count">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                name="count"
              >
                Số lượng
              </label>
              <input
                type="text"
                className="form-control"
                name="count"
                onChange={(e) => setcount(e.target.value)}
              />
            </div>
            <div className="mb-3 Form-Category">
              <label htmlFor="category" className="form-label">
                Danh mục sản phẩm
              </label>
              <select
                id="category"
                className="form-select"
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {dataCategory.map((item, index) => {
                  return (
                    <option
                      key={index}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      {item.Namecategory}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-createProduct"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateProduct;
