import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/Auth/authSlice";
import { RootState } from "../../app/store";

//////////////////// ---- Header component ---- ////////////////////

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [menu, setmenu] = useState(false);

  /////////// ---- Profile menu show handler ---- ///////////

  const handleShowMenu = () => {
    setmenu((prevstate) => !prevstate);
  };

  /////////// ---- Logout handler ---- ///////////

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setmenu((prevstate) => !prevstate);
  };

  return (
    <div>
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-8">
              <div className="logo-and-navbar">
                {/* ------ Navbar Logo ------ */}
                <div className="logo">
                  <Link to={"/"}>
                    <img
                      src="/images/Tech-mentor.png"
                      width={120}
                      height={40}
                      style={{ borderRadius: "10px" }}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nav-bar">
                  <ul>
                    {/* ------ About page Link ------ */}

                    <li>
                      <Link to={"/about"}>About</Link>
                    </li>

                    {/* ------ Leader Board page Link ------ */}

                    <li>
                      <Link to={"/leaderboard"}>Mentors Leaderboard</Link>
                    </li>

                    {/* ------ Become a mentor form Link ------ */}

                    {user && user.role == "user" && (
                      <li>
                        <Link to={`/user/${user.id}/become`}>
                          Become a mentor
                        </Link>
                      </li>
                    )}

                    {/* ------ Videos page Link ------ */}

                    <li>
                      <Link to={"/videos"}>Find Videos</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ------ Menu ------ */}

            <div className="col-lg-4">
              <div className="login-register">
                {user && (
                  <a>
                    <img
                      onClick={handleShowMenu}
                      src={user.imageUrl}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </a>
                )}

                {menu && (
                  ///// ------ Dashboard Links ------ /////
                  <div className="manageandlogin">
                    {user && user.role == "mentor" && (
                      <Link to={`/mentor/${Number(user.id)}`}>Dashboard</Link>
                    )}
                    {user && user.role == "admin" && (
                      <Link to={`/admin/${Number(user.id)}`}>Dashboard</Link>
                    )}
                    {user && user.role == "user" && (
                      <Link to={`/user/${Number(user.id)}`}>Dashboard</Link>
                    )}

                    <a onClick={handleLogout}>Logout</a>
                  </div>
                )}

                {/* ------ Login - Register Link ------ */}

                {!user && <a href="/login"> "Login / Register"</a>}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
