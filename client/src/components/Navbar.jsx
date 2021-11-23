import { NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("authToken");
  const LogOutButton = (props) => {
    return (
      <button
        onClick={props.logoutHandler}
        className="mx-3 font-medium text-white hover:text-midnight"
      >
        Logout
      </button>
    );
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    props.setLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="bg-shamrock-green fixed w-full py-4 z-10">
        <div className="max-w-5xl lg:max-w-12xl mx-auto">
          <div className="flex justify-between">
            <NavLink to="/" className="flex items-center text-white mx-3">
              <span className="text-xl font-bold">Daily Report</span>
            </NavLink>
            {props.loggedIn || auth ? (
              <LogOutButton logoutHandler={logoutHandler} />
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
