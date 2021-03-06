import * as React from "react";
import "./ManageRequestedBlogs.css";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function ManageRequestedBlogs() {
  // const [userOrders, setUserOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://pure-refuge-78290.herokuapp.com/requestedBlogs")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false))
      .catch();
  }, []);

  const handleUpdateUser = (id) => {
    const url = `https://pure-refuge-78290.herokuapp.com/blogs/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Update Successful");
        }
        console.log(data);
        fetch("https://pure-refuge-78290.herokuapp.com/requestedBlogs")
          .then((res) => res.json())
          .then((data) => setData(data));
      });
  };
  const handleDeleteUserService = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?", id);
    if (proceed) {
      const url = `https://pure-refuge-78290.herokuapp.com/blogs/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((remainingData) => {
          if (remainingData.deletedCount > 0) {
            alert("Deleted successfully");
            const remainingUsers = data.filter(
              (userService) => userService._id !== id
            );
            setData(remainingUsers);
          }
        });
    }
  };

  return (
    <div>
      <h1 className="heading text-warning">MANAGE REQUESTED BLOGS</h1>
      {isLoading && (
        <div className="d-flex align-items-center my-5 py-5">
          <CircularProgress className="mx-auto" />
        </div>
      )}
      {!isLoading && !data[0] && (
        <div className="my-5">
          <h3 className="text-info fw-bold">There is no blog requested.</h3>
        </div>
      )}
      {data[0] && (
        <div>
          {data.map((userOrder) => (
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
                    <div>
                      <h5 className="card-title fw-bold">{userOrder.title}</h5>
                      <h6>Place: {userOrder.place}</h6>
                      <h6>Traveler: {userOrder.name}</h6>
                      <div className="mt-2">
                        <div className="mb-2">
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => handleUpdateUser(userOrder._id)}
                          >
                            Approve
                          </button>
                        </div>
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
                            onClick={() =>
                              handleDeleteUserService(userOrder._id)
                            }
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
