import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../features/Auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, user } = useSelector((state: RootState) => state.auth);

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isRightPanelActive, setRightPanelActive] = useState(false);

  ////////// ---- Right panel toggler ---- //////////
  const toggleRightPanel = () => {
    setRightPanelActive((prevState) => !prevState);
  };

  useEffect(() => {
    console.log({ userName, password, isLoading, user });
  }, [userName, password, isLoading, user]);

  ////////// ---- Login Handler ---- //////////
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const credentials = {
      userName,
      password,
    };
    dispatch(loginUser({ credentials, navigate }));
  };

  // const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const user = {
  //     firstName,
  //     lastName,
  //     userName,
  //     email,
  //     password,
  //     phoneNumber,
  //     roles: ["Manager", "User"],
  //   };

  //   const { data } = await axios.post(
  //     "https://localhost:5001/api/authentication",
  //     JSON.stringify(user),
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log({ data });
  // };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
      roles: ["Manager", "User"],
    };
    dispatch(signupUser({ user, navigate }));
  };

  return (
    <div>
      <div className="wrapper">
        {/* <ToastContainer /> */}
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div
            className={`container ${
              isRightPanelActive ? "right-panel-active" : ""
            }`}
            id="container"
          >
            {/* ////////// ---- Sign Up container ---- ////////// */}

            <div className="form-container sign-up-container">
              <form className="form" onSubmit={handleSignup}>
                <h1 className="h1">Create Account</h1>
                <input
                  className="input"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="UserName"
                  required
                  onChange={(event) => setUserName(event.target.value)}
                />
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Phone"
                  required
                  minLength={6}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <button className="button" type="submit">
                  Sign Up
                </button>
              </form>
            </div>

            {/* ////////// ---- Login container ---- ////////// */}

            <div className="form-container sign-in-container">
              <form className="form" onSubmit={handleLogin}>
                <h1 className="h1">Sign in</h1>
                <input
                  className="input"
                  type="text"
                  placeholder="UserName"
                  required
                  onChange={(event) => setUserName(event.target.value)}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Link to={"/mailrequest"} className="a">
                  Forgot your password?
                </Link>
                <button className="button" type="submit">
                  Sign In
                </button>
                <Link className="a" to={"/"}>
                  Go back
                </Link>
              </form>
            </div>

            {/* ////////// ---- overlay container ---- ////////// */}

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="h1">Welcome Back!</h1>
                  <p className="p">please login with your personal info</p>
                  <button
                    className="button ghost"
                    id="signIn"
                    onClick={toggleRightPanel}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="h1">Hello !</h1>
                  <p className="p">Enter your personal details</p>
                  <button
                    className="button ghost"
                    id="signUp"
                    onClick={toggleRightPanel}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <form
        onSubmit={handleLogin}
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
      </form> */}
      {/* <button type="submit">
        <Link to={"/register"}>Register</Link>
      </button> */}
    </div>
  );
};

export default Login;
