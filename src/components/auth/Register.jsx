import React, { useEffect, useState } from "react";
import { registerUser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { StyledForm } from "./styledForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const nav = useNavigate();
  console.log(auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  useEffect(() => {
    if (auth._id) {
      nav("/cart");
    }
  }, [auth._id, nav]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="role">Choose a Role:</label>
        <select
          name="role"
          id="role"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="staff">Staff</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </div>
  );
};

export default Register;
