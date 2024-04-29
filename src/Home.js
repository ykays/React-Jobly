import React, { useContext } from "react";
import userContext from "./UserContext";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Home.css";

const Home = () => {
  const { user } = useContext(userContext);
  if (!user) {
    return (
      <div className="Home">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        <Button>
          <Link to="/signup" className="Home-button">
            Sign Up
          </Link>
        </Button>
        <Button>
          <Link to="/login" className="Home-button">
            Log In
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      <h2>Welcome Back, {user.user["firstName"]}!</h2>
    </div>
  );
};

export default Home;
