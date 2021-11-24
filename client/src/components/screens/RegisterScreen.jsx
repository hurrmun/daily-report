import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    if (password.length < 6) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords must be at least 6 characters");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      //   console.log(data.token);
      localStorage.setItem("authToken", data.token);
      props.setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="max-w-4xl lg:max-w-7xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
        <form onSubmit={registerHandler}>
          <div className="grid grid-cols-1 justify-items-center text-midnight">
            <h3 className="text-midnight text-4xl font-bold mb-4">
              Register Account
            </h3>
            {error && (
              <span className="text-white bg-brown-sugar">{error}</span>
            )}
            <div className="form-group mt-2 w-80">
              <label
                htmlFor="username"
                className="font-semibold text-lg text-pine-green"
              >
                Username
              </label>
              <input
                type="text"
                required
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-shamrock-green rounded-sm w-full h-8 pl-2 placeholder-opacity-50 placeholder-shamrock-green"
              />
            </div>
            <div className="form-group mt-2 w-80">
              <label
                htmlFor="email"
                className="font-semibold text-lg text-pine-green"
              >
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-shamrock-green rounded-sm w-full h-8 pl-2 placeholder-opacity-50 placeholder-shamrock-green"
              />
            </div>
            <div className="form-group mt-2 w-80">
              <label
                htmlFor="password"
                className="font-semibold text-lg text-pine-green"
              >
                Password
              </label>
              <input
                type="password"
                required
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-shamrock-green rounded-sm w-full h-8 pl-2 placeholder-opacity-50 placeholder-shamrock-green"
              />
            </div>
            <div className="form-group mt-2 w-80">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-lg text-pine-green"
              >
                Confirm Password
              </label>
              <input
                type="password"
                required
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-shamrock-green rounded-sm w-full h-8 pl-2 placeholder-opacity-50 placeholder-shamrock-green"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-shamrock-green rounded-sm w-80 text-white font-lg py-2 font-bold hover:bg-brown-sugar"
            >
              Register
            </button>
            <div className="grid justify-items-center w-80">
              <span className="text-red-600 text-sm mt-4">
                Already have an account?
                <Link to="/login" className="font-bold hover:text-brown-sugar">
                  {" "}
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
