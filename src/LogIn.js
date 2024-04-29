import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

const LogIn = ({ logInUser }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [logInForm, setLogInForm] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await logInUser(logInForm);
    if (!result.success) {
      return setErrors(result.err);
    }

    setLogInForm(initialState);
    navigate("/");
  };

  return (
    <div className="LogIn">
      <form onSubmit={handleSubmit} className="LogIn-Form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={logInForm.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={logInForm.password}
          onChange={handleChange}
        />

        {errors.length ? <p style={{ color: "red" }}>{errors}</p> : null}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LogIn;
