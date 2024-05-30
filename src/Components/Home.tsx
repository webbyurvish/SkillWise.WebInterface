import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log({ user });
  return (
    <div>
      Home
      <button>
        <Link to={"/login"}>Login</Link>
      </button>
      <button>
        <Link to={"/register"}>Register</Link>
      </button>
    </div>
  );
};

export default Home;
