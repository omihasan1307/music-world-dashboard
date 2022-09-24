import React from "react";
import { Link, Outlet } from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";

const Home = () => {
  return (
    <div className="container common-line">
      <div className="row">
        <div className="col-12 col-md-2 border-end text-center">
          <h3 className="mt-3">Dashboard</h3>
          <hr />

          <Link to="/product" className="side-nav">
            Add Product
          </Link>

          <Link to="/viewProduct" className="side-nav">
            View
          </Link>

          <Link to="/order" className="side-nav">
            Order
          </Link>

          <Link to="/contact" className="side-nav">
            Contact
          </Link>

          <Link to="/users" className="side-nav">
            Users
          </Link>
        </div>
        <div className="col-12 col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
