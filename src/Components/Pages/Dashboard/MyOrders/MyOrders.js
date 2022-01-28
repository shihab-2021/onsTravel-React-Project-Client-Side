import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const MyOrders = () => {
  const { user, token } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const url = `https://pure-refuge-78290.herokuapp.com/myBlog?email=${user.email}`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserOrders(data))
      .then(() => setIsLoading(false));
  }, [user.email, token]);
  console.log(userOrders);

  const handleDeleteUserService = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?", id);
    if (proceed) {
      const url = `https://pure-refuge-78290.herokuapp.com/blogs/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remainingUsers = userOrders.filter(
              (userService) => userService._id !== id
            );
            setUserOrders(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h1 className="heading text-success">MY BLOGS</h1>
      {isLoading && (
        <div className="d-flex align-items-center my-5 py-5">
          <CircularProgress className="mx-auto" />
        </div>
      )}
      {!isLoading && !userOrders[0] && (
        <div className="my-5">
          <h3 className="text-info fw-bold">
            You haven't posted any blog yet.
          </h3>
          <h4 className="text-warning fw-bold">Thank you for visiting us.</h4>
        </div>
      )}
      {userOrders[0] && (
        <div>
          <h2 className="text-secondary my-3">
            Number of blog: {userOrders.length}
          </h2>
          {userOrders.map((userOrder) => (
            <div
              key={userOrder._id}
              className="card mb-3 border-0 shadow"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center">
                  <img
                    src={userOrder.image1}
                    className="img-fluid p-2"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fw-bold fs-4">
                      {userOrder.title}
                    </h5>
                    <h6 className="fs-6 mb-2">{userOrder.place}</h6>
                    <p
                      className="border border-warning rounded-pill d-inline p-1"
                      style={{ backgroundColor: "#dbe3e3" }}
                    >
                      <small className="text-danger">
                        {userOrder.condition}
                      </small>
                    </p>
                    <div className="mt-2">
                      <div>
                        <Link
                          to={`/details/${userOrder._id}`}
                          className="w-50 text-center my-2 link me-2"
                        >
                          <button className="btn btn-outline-info">
                            <i className="fas fa-info-circle"></i> Detail
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteUserService(userOrder._id)}
                          type="button"
                          className="align-self-center btn btn-outline-danger mx-auto"
                        >
                          <i className="fa-solid fa-trash-can"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
