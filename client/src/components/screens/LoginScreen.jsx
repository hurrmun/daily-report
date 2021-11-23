import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      props.setLoggedIn(true);
      navigate("/", { replace: true });
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
            <h3 className="text-midnight text-4xl font-bold mb-4">Log In</h3>
            {error && (
              <span className="text-white bg-brown-sugar">{error}</span>
            )}

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

            <button
              type="submit"
              className="mt-4 bg-shamrock-green rounded-sm w-80 text-white font-lg py-2 font-bold hover:bg-brown-sugar"
            >
              Log In
            </button>
            <div className="grid justify-items-center w-80">
              <span className="text-red-600 text-sm mt-4">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-bold hover:text-brown-sugar"
                >
                  {" "}
                  Register new account
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
