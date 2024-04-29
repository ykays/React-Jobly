import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import "./Profile.css";

const Profile = ({ updateUser }) => {
  const { user, setUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    username: user?.user.username,
    firstName: user?.user.firstName,
    lastName: user?.user.lastName,
    email: user?.user.email,
  });

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await updateUser(userForm);
    if (user) {
      setError("Update successful");
    }
  };

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="Profile-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={userForm.username}
          disabled
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={userForm.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={userForm.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userForm.email}
          onChange={handleChange}
        />
        {error && <p style={{ color: "green" }}>{error}</p>}
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
