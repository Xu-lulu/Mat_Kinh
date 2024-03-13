import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateProduct } from "../../../redux/api/apiProductAdmin";
import { useDispatch, useSelector } from "react-redux";
const Update = (props) => {
  const { id } = useParams();
  // const { allProducts, dataup } = props;
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  // const [dataCategory, setdataCategory] = useState([]);
  const navgigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  // dataUpdateProduct(dispatch, id, token);
  // console.log('id',id)
  // console.log("token", token);
  const alldataProducts = useSelector(
    (state) => state.admin.allproductAdmin.dataProductsAdmin
  );
  const dataupdate = alldataProducts.find((item) => item._id === id);
  // const dataUpdate = useSelector(
  //   (state) => state.admin.UpdateProductAdmin.dataUpdateProductAdmin
  // );
  useEffect(() => {
    setdescription(dataupdate.Description);
    setname(dataupdate.Name);
    setprice(dataupdate.Price);
    setcategory(dataupdate.Category);
    setcount(dataupdate.count);
  }, [dataupdate]);
  const dataCategory = useSelector(
    (state) => state.products.categorys.dataCategorys
  );

  // console.log("dataCategory", dataCategory);
  // useEffect(() => {
  //   async function getDatas() {
  //     const res = await axios.post(
  //       "http://localhost:3000/dataupdate/" + `${id}`
  //     );
  //     return res;
  //   }
  //   getDatas().then((res) => {
  //     setname(res.data.Name);
  //     setprice(res.data.Price);
  //     setdescription(res.data.Description);
  //     setcategory(res.data.Category);
  //   });
  //   getDatas().catch((err) => console.log(err));
  // }, []);
  // useEffect(() => {
  //   async function getData() {
  //     const res = await axios.get("http://localhost:3000/allCategory");
  //     return res;
  //   }
  //   getData().then((res) => setdataCategory(res.data));
  //   getData().catch((err) => console.log(err));
  // }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addproducts = {
      Name: name,
      Price: price,
      Description: description,
      Image: urlimg,
      count: count,
      Category: category,
    };
    // await axios.put("http://localhost:3000/update/" + `${id}`, addproducts, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // toast.success("Sửa thành công");
    UpdateProduct(dispatch, id, token, addproducts,navgigate);
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Cập nhật Món Ăn</h3>
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
                      <img
                        className="selected-image"
                        src={`http://localhost:3000/` + dataupdate.Image}
                        alt=""
                      ></img>
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
                value={description}
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
                value={name}
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
                value={price}
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
                value={count}
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
                value={category}
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
              className="btn btn-primary Create-submit"
              onClick={handleSubmit}
            >
              Sửa sản phẩm
            </button>
          </div>
        </form>
      </div>
      {/* <form>
        <div className="mb-3" onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label" name="price">
            Giá
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" name="description">
            Chi tiết sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Chọn ảnh
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Danh mục sản phẩm
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">{category}</option>
            {dataCategory.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.Namecategory}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  {item.Namecategory}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form> */}
    </>
  );
};
export default Update;
