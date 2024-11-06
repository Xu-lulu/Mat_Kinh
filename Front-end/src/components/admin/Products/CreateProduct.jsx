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
import Model from "../../../common/Model";
import { createProduct } from "../../../redux/api/apiProductAdmin";
import { createAxios } from "../../../common/createInstane";
import { loginSuccess } from "../../../redux/authSlice";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
} from "../../../common/dataReux";
const CreateProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const text = "Bạn có chắc chắn muốn lưu không?";
  const textheader = "Thêm sản phẩm";
  const textfooter = "Lưu";
  const dataCurrent = useDataCurrentUser();
  const dispatch = useDispatch();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  const navgigate = useNavigate();
  const dataCategory = useDataCategory();
  const token = useAccessToken();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const addproducts = {
    //   Name: name,
    //   Price: price,
    //   Description: description,
    //   image: urlimg,
    //   count: count,
    //   Category: category,
    // };
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Image", urlimg);
    formData.append("count", count);
    formData.append("Category", category);
    createProduct(dispatch, navgigate, token, formData, axiosJWT);
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Thêm Món Ăn</h3>
        <form
          className="Form-Create-Product"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="Image-Des">
            <div>
              <label className="form-label" htmlFor="image">
                Chọn ảnh
              </label>
              {selectedImage ? (
                <>
                  <div>
                    <label className="form-label" name="Image" htmlFor="image">
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
                      name="Image"
                      accept="*/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 Image-form" onSubmit={handleSubmit}>
                    <label className="form-label" name="Image" htmlFor="image">
                      <div className="icon-image">
                        <FontAwesomeIcon icon={faImage} />
                      </div>
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="Image"
                      accept="*/*"
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
            <button type="submit" className="btn btn-createProduct">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateProduct;
