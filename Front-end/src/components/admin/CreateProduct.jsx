import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const [dataCategory, setdataCategory] = useState([]);
  const navgigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:3000/allCategory");
      return res;
    }
    getData().then((res) => setdataCategory(res.data));
    getData().catch((err) => console.log(err));
  }, []);
  //   console.log(dataCategory);
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
    await axios.post("http://localhost:3000/uploadProducts", addproducts, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Thêm thành công");
    navgigate("/admin");
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
  };
  console.log("anh", urlimg);
  return (
    <>
      <form>
        <div className="mb-3" onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label" name="price">
            Giá
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default CreateProduct;
