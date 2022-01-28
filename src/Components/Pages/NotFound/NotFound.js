import React from "react";
import Header from "../../Shared/Header/Header";

const NotFound = () => {
  return (
    <div>
      <Header></Header>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
            <img
              className="img-fluid"
              src="https://i.ibb.co/W0TtYNX/Pu-Xip-AW3-AXUz-UJ4u-Yyx-PKC-1200-80-removebg-preview.png"
              alt=""
            />
          </div>
          <div
            style={{ fontFamily: `"Yanone Kaffeesatz", sans-serif` }}
            className="col-sm-12 col-md-6 heading d-flex align-items-center text-center justify-content-center"
          >
            <div>
              <h1
                style={{
                  fontWeight: "600",
                  fontFamily: `"Yanone Kaffeesatz", sans-serif`,
                }}
              >
                Aww...Don't Cry.
              </h1>
              <h5
                className="pb-3"
                style={{
                  fontWeight: "600",
                  fontFamily: `"Yanone Kaffeesatz", sans-serif`,
                }}
              >
                It's just a 404 Error!
              </h5>
              <h4
                style={{
                  fontWeight: "600",
                  fontFamily: `"Yanone Kaffeesatz", sans-serif`,
                }}
              >
                What you're looking for may have been misplaced
              </h4>
              <h4
                style={{
                  fontWeight: "600",
                  fontFamily: `"Yanone Kaffeesatz", sans-serif`,
                }}
              >
                in long Term Memory.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
