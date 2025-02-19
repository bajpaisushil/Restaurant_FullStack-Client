import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../features/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function UserProfile() {
  const params = useParams();
  const auth=useSelector(state=> state.auth);
  console.log('auth', auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${url}/users/find/${params.id}`,
          setHeaders()
        );
        console.log("resres-", res);
        setUser({ ...res.data, password: "" });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setLoading(false);
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length <= 4) {
      return alert("Password length should be greater than 4");
    }
    setUpdating(true);
    try {
      const res = await axios.put(
        `${url}/users/${params.id}`,
        {
          ...user,
        },
        setHeaders()
      );
      setUser({ ...res.data, password: "" });
      toast.success("Profile Updated");
      setUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('useruser-', user);

  return (
    <StyledProfile>
      <ProfileContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>User Profile</h3>
            {user.role === "staff" ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label htmlFor="name">Email:</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            {auth.role === "staff" && user.role!=="staff" ? (
              <></>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="name">Password:</label>
                <input
                  type="text"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <button>{updating ? "Updating..." : "Update Profile"}</button>
              </div>
            )}
          </form>
        )}
      </ProfileContainer>
    </StyledProfile>
  );
}

export default UserProfile;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;
const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-bottom: 0.5rem;
    }
    label {
      margin-bottom: 0.2rem;
      color: gray;
    }
    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
    }
    button {
      padding: 5px;
    }
  }
`;
const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
const Customer = styled.div`
  color: rgb(28, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
