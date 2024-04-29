import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = ({ registerUser }) => {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [userForm, setUserForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(userForm);
    setUserForm(initialState);
    navigate("/");
  };

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit} className="SignUp-Form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={userForm.username}
          required
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={userForm.password}
          required
          onChange={handleChange}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={userForm.firstName}
          required
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={userForm.lastName}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userForm.email}
          required
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
