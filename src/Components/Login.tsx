import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../features/Auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [cookies, setCookie] = useCookies<string>(["Tokens"]);

  useEffect(() => {
    console.log({ userName, password });
  }, [userName, password]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.post(
      "https://localhost:5001/api/authentication/login",
      JSON.stringify({ userName, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data != null) {
      setCookie("Tokens", data, { path: "/", maxAge: 60 });
      dispatch(setUser(data));
      navigate("/", { replace: true });
    }
    console.log({ data, cookies });
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          value={userName}
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="submit">
        <Link to={"/register"}>Register</Link>
      </button>
    </div>
  );
};

export default Login;
