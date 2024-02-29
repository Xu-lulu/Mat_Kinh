import ProductsCart from "./ProductCard";
import { useState, useEffect } from "react";
import "./Products.scss";
import ReactPaginate from "react-paginate";
// import "../Navbars/Navbars.scss";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
const Products = (props) => {
  const { allProducts, loading } = props;
  const [dataCategory, setdataCategory] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setitemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allProducts]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:3000/allCategory");
      return res;
    }
    getData().then((res) => setdataCategory(res.data));
    getData().catch((err) => console.log(err));
  }, []);
  // const rendeclink = () => {
  //   useEffect(() => {}, []);
  // };
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % allProducts.length;
    // const newOffset = Math.min(
    //   event.selected * itemsPerPage,
    //   allProducts.length
    // );
    const newOffset = event.selected * itemsPerPage;

    setitemOffset(newOffset);
    console.log("even", event.selected);
  };
  console.log(allProducts.length);
  return (
    <>
      <div className="product">
        <nav className="navbarpro">
          <NavLink
            className="btn"
            to="/products"
            exact={true}
            activeClassName="active"
          >
            {" "}
            All
          </NavLink>
          {dataCategory.map((item, index) => {
            return (
              <NavLink
                className="btn"
                key={index}
                to={`/products/category/${item.Namecategory}`}
                active="active"
                // onClick={rendeclink}
              >
                {item.Namecategory}
              </NavLink>
            );
          })}
        </nav>{" "}
        {!loading ? (
          <div className="row row-cols-5 gy-1 p-5">
            {currentItems.map((product, index) => {
              return (
                <div className="product-card p-1" key={index}>
                  <ProductsCart
                    _id={product._id}
                    Name={product.Name}
                    Price={product.Price}
                    Description={product.Description}
                    Image={product.Image}
                    Count={product.count}
                    Category={product.Category}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="panigation"
        pageClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Products;
