import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ShowEntries from "../ShowEntries";

const UserReport = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [entries, setEntries] = useState([]);
  const selectedDate = props.selectedDate;
  const { date, user } = useParams();

  useEffect(() => {
    const fetchEntries = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          `/api/private/getEntries/${selectedDate}/${user}`,
          config
        );
        setEntries(data.data.entries);
        console.log(data.data.entries);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        navigate("/login", { replace: true });
      }
    };
    fetchEntries();
  }, [selectedDate, user, navigate]);

  return (
    <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
      <div className="grid grid-cols-1">
        <div className="flex justify-between content-center mb-4">
          <h1 className="text-3xl font-bold text-midnight">
            <Link to={`/reports/${date}`} className="hover:text-brown-sugar">
              {date?.split("_")?.join(" ")}
            </Link>{" "}
            - {user}
          </h1>
        </div>
        <table className="table-fixed text-midnight border-seperate">
          <thead className="text-lg">
            <tr>
              <th className="w-2/12 py-4">Material</th>
              <th className="w-2/12 py-4">Supplier</th>
              <th className="w-2/12 py-4">Ordered Load</th>
              <th className="w-2/12 py-4">Received Load</th>
              <th className="w-2/12 py-4">Quantity (MT)</th>
              <th className="w-2/12 py-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-pine-green">
            <ShowEntries entries={entries} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReport;
