import ProductsCart from "./ProductCard";
import { useState, useEffect } from "react";
import "./Products.scss";
import ReactPaginate from "react-paginate";
// import "../Navbars/Navbars.scss";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Search from "../search/search";
import BanerProducts from "../baner/banerProducts";
import { useSelector } from "react-redux";
const Products = (props) => {
  const { loading } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setitemOffset] = useState(0);
  const itemsPerPage = 10;
  const alldataProducts = useSelector(
    (state) => state.products.allproduct.dataProducts
  );
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(alldataProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, alldataProducts]);
   const dataCategory = useSelector(
     (state) => state.products.categorys.dataCategorys
   );
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;

    setitemOffset(newOffset);
    console.log("even", event.selected);
  };

  return (
    <>
      <div className="Product-page">
        <div className="products-banner">
          <BanerProducts/>
        </div>
        <div className="product">
          <nav className="navbarpro">
            <NavLink
              className="btn"
              to="/products"
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
                >
                  {item.Namecategory}
                </NavLink>
              );
            })}
          </nav>{" "}
          {!loading ? (
            <div className="alldataproduct row row-cols-5 gy-1">
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
      </div>
    </>
  );
};

export default Products;
