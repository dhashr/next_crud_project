"use client";
import React from "react";
import Link from "next/link";
import AllUsers from "./components/all-user";

const Home = () => {
  return (
    <div>
      <div className="d-flex mb-2">
        <Link className="btn btn-primary" href="../add/">
          Add User
        </Link>
      </div>
      <div>
        <AllUsers />
      </div>
    </div>
  );
};

export default Home;
