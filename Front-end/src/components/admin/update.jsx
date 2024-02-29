import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = (props) => {
  const { id } = useParams();
  const { allProducts, dataup } = props;
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const [dataCategory, setdataCategory] = useState([]);
  const navgigate = useNavigate();
  //

  useEffect(() => {
    async function getDatas() {
      const res = await axios.post(
        "http://localhost:3000/dataupdate/" + `${id}`
      );
      return res;
    }
    getDatas().then((res) => console.log(res));

    getDatas().then((res) => setname(res.data.Name));
    getDatas().then((res) => setprice(res.data.Price));
    getDatas().then((res) => setdescription(res.data.Description));
    getDatas().then((res) => setcategory(res.data.Category));
    getDatas().catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:3000/allCategory");
      return res;
    }
    getData().then((res) => setdataCategory(res.data));
    getData().catch((err) => console.log(err));
  }, []);
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
    await axios.put("http://localhost:3000/update/" + `${id}`, addproducts, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Sửa thành công");
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
  };
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
      </form>
    </>
  );
};
export default Update;
