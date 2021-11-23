import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login", { replace: true });
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  return (
    <>
      <div>{privateData}</div>
    </>
  );
};

export default PrivateScreen;
