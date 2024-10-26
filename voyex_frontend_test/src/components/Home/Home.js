// src/components/HomePage/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Assuming you have a separate CSS file for HomePage
import Map from "../Map/Map"; // Import Map component

const HomePage = () => {
  return (
    <div className="container mt-5">
      {/* Latest Posts and Chat Section */}
      {/*  */}

      {/* <PostList /> */}
      {/*  */}
      <div className="row">
        {/* Chat Feature */}
        {/*  */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Chat</h5>
              <div className="chat-box">
                <p className="text-muted">Chat feature coming soon!</p>
              </div>
              <Link to="/chat" className="btn btn-primary w-100 mt-3">
                Go to Chat
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Directions Section */}
      <div className="row mt-5">
        <div className="col-md-12">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
