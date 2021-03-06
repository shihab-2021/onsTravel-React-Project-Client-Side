import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeBlogs.css";

const HomeBlogs = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    fetch("https://pure-refuge-78290.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.result))
      .then(() => setIsLoading(false));
  }, []);
  const allBlogs = allProducts.filter((td) => td?.condition === "approved");
  const size = 10;
  console.log(allBlogs.length);
  let pageNumber = 0;
  if (allBlogs.length) {
    pageNumber = Math.ceil(allBlogs.length / size);
  }
  useEffect(() => {
    fetch(
      `https://pure-refuge-78290.herokuapp.com/blogs?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.result))
      .then(() => setIsLoading(false));
  }, [page]);
  const blogs = products.filter((td) => td?.condition === "approved");

  return (
    <div>
      <div className="container">
        <h1
          style={{ color: "darksalmon" }}
          className="text-center heading pt-5"
        >
          BLOG COLLECTION
        </h1>
        {isLoading && (
          <div className="d-flex align-items-center my-5 py-5">
            <CircularProgress className="mx-auto" />
          </div>
        )}
        {!isLoading && (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 py-5">
            {blogs.map((singleBlog) => (
              <div key={singleBlog._id} className="col">
                <div>
                  <div className="card shadow" style={{ minHeight: "450px" }}>
                    <div
                      style={{ minHeight: "215px" }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={singleBlog.image1}
                        className="card-img img-fluid p-1"
                        alt="..."
                      />
                    </div>
                    <div className="card-body border-top">
                      <h5 className="fs-5 mb-1 fw-bold">{singleBlog.title}</h5>
                      <h6 className="card-title">{singleBlog.place}</h6>
                      <Rating
                        style={{ fontSize: "15px" }}
                        name="half-rating-read"
                        value={`${singleBlog.rating}`}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <Link
                      className="fw-bold"
                      style={{ textDecoration: "none", color: "goldenrod" }}
                      to={`/details/${singleBlog._id}`}
                    >
                      <div
                        className="text-center py-2"
                        style={{ backgroundColor: "#dbe3e3" }}
                      >
                        <i className="fas fa-info-circle"></i> Detail
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-30 mb-5">
          {pageNumber &&
            [...Array(pageNumber)?.keys()].map((number) => (
              <button
                className="btn btn-info "
                className={
                  number === page
                    ? "btn btn-outline-info mx-2"
                    : "btn btn-info mx-1"
                }
                key={number}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogs;
