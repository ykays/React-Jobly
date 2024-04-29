import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";
import Jobs from "./Jobs";
import SignUp from "./SignUp";
import UserContext from "./UserContext";
import useLocalStorageState from "./hooks/useLocalStorageState";
import JoblyApi from "./api";
import LogIn from "./LogIn";
import Profile from "./Profile";
import { jwtDecode } from "jwt-decode";
import Job from "./Job";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorageState("token");
  const [user, setUser] = useState();

  async function registerUser(user) {
    const userToken = await JoblyApi.registerUser(user);
    setToken(userToken.token);
  }

  async function logInUser(user) {
    try {
      const userToken = await JoblyApi.logInUser(user);
      setToken(userToken.token);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  async function updateUser(user) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const res = await JoblyApi.updateUserDetails(user.username, data);
    setUser((user) => ({ ...res }));
    return res;
  }

  async function applyToJob(id) {
    const res = await JoblyApi.applyToJob(user.user.username, id);
    return res;
  }

  function logOutUser() {
    setToken(undefined);
    setUser("");
  }

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    const decoded = jwtDecode(token);
    async function getUserDetails(username) {
      const res = await JoblyApi.getUserDetails(username);
      setUser((user) => ({ ...res }));
      setIsLoading(false);
    }
    getUserDetails(decoded.username);
    setIsLoading(true);
  }, [token]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar logOutUser={logOutUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route
              path="/companies/:handle"
              element={<CompanyDetails applyToJob={applyToJob} />}
            />
            <Route path="/jobs" element={<Jobs applyToJob={applyToJob} />} />
            <Route
              path="/signup"
              element={<SignUp registerUser={registerUser} />}
            />
            <Route path="login" element={<LogIn logInUser={logInUser} />} />
            <Route
              path="profile"
              element={<Profile updateUser={updateUser} />}
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
