import ProductsCart from "./ProductCard";
import { useState, useEffect } from "react";
import "./Products.scss";
import ReactPaginate from "react-paginate";
import { Pagination } from "antd";
// import "../Navbars/Navbars.scss";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Search from "../search/search";
// import BanerProducts from "../baner/banerProducts";
import BanNer from "../baner/baner";
import { useSelector } from "react-redux";
import { datacategory, dataproduct } from "../../common/dataReux";
const Products = () => {
  // const [currentItems, setCurrentItems] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setitemOffset] = useState(0);
  // const itemsPerPage = 10;
  // const alldataProducts = useSelector(
  //   (state) => state.products.allproduct.dataProducts
  // );
  // const dataCategory = useSelector(
  //   (state) => state.products.categorys.dataCategorys
  // );
  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(alldataProducts.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, alldataProducts]);
  // const handlePageClick = (event) => {
  //   const newOffset = event.selected * itemsPerPage;
  //   setitemOffset(newOffset);
  //   console.log("even", event.selected);
  // };

  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const alldataProducts = dataproduct();
  const dataCategory = datacategory();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
  }, [itemOffset, alldataProducts]);

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="Product-page">
        <div className="products-banner">
          <BanNer />
        </div>
        <div className="product">
          <nav className="navbarpro">
            <NavLink className="btn" to="/products">
              All
            </NavLink>
            {dataCategory.map((item, index) => {
              return (
                <NavLink
                  className="btn"
                  key={index}
                  to={`/products/category/${item.Namecategory}`}
                >
                  {item.Namecategory}
                </NavLink>
              );
            })}
          </nav>{" "}
          {alldataProducts ? (
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
        {/* <ReactPaginate
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
        /> */}
        <Pagination
          current={Math.floor(itemOffset / itemsPerPage) + 1}
          pageSize={itemsPerPage}
          total={alldataProducts.length}
          onChange={handlePageChange}
          className="Pagination"
        />
      </div>
    </>
  );
};

export default Products;
