import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import ViewsSectionBody from "./View/Views-Section-Body";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log({ user });
  return (
    <ViewsSectionBody>
      Home
      {/* <button>
        <Link to={"/login"}>Login</Link>
      </button>
      <button>
        <Link to={"/register"}>Register</Link>
      </button>
      <button>
        <Link to={"/bementor"}>Become A Mentor</Link>
      </button>
      <button>
        <Link to={"/mentors"}>Mentors</Link>
      </button> */}
    </ViewsSectionBody>
  );
};

export default Home;
