import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

  const ShowEntries = (props) => {
    const entries = props.entries;
    console.log(entries);
    const Entry = (props) => {
      return (
        <tr className="border border-shamrock-green">
          <td className="py-4 my-4 text-center font-bold">{props.material}</td>
          <td className="py-4 text-center">{props.supplier}</td>
          <td className="py-4 text-center">{props.ordered_load}</td>
          <td className="py-4 text-center">{props.received_load}</td>
          <td className="py-4 text-center">{props.quantity}</td>
          <td className="py-4 text-center">{props.remarks}</td>
        </tr>
      );
    };

    const allEntries = entries.map((item) => {
      return (
        <Entry
          key={item.entry_id}
          material={item.material}
          supplier={item.supplier}
          ordered_load={item.ordered_load}
          received_load={item.received_load}
          quantity={item["quantity(MT)"]}
          remarks={item.remarks}
        />
      );
    });

    return <>{allEntries}</>;
  };

  return (
    <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
      <div className="grid grid-cols-1">
        <div className="flex justify-between content-center mb-4">
          <Link to={`/reports/${date}`}>
            <h1 className="text-3xl font-bold text-midnight hover:text-brown-sugar">
              {date?.split("_")?.join(" ")} - {user}
            </h1>
          </Link>
          {/* <NewEditButton function="new" /> */}
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
