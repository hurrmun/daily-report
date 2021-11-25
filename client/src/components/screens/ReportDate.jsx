import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShowReports from "../ShowReports";

const ReportDate = (props) => {
  const navigate = useNavigate();
  const { date } = useParams();
  const [reports, setReports] = useState({});
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const selectedDate = props.selectedDate;

  useEffect(() => {
    const fetchEntriesByDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          `/api/private/getEntries/${selectedDate}`,
          config
        );
        setReports(data.data.entries);
        setUser(data.data.user.username);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        navigate("/login", { replace: true });
      }
    };
    fetchEntriesByDate();
  }, [selectedDate, navigate]);

  const NewReportButton = (props) => {
    const makeNewReport = () => {
      // console.log(props.user);
      navigate(`/reports/${date}/${props.user}/new`);
    };
    return (
      <>
        <button
          onClick={makeNewReport}
          className="bg-pine-green rounded text-white text-xl font-bold py-2 px-4 hover:bg-brown-sugar"
        >
          New report
        </button>
      </>
    );
  };

  return (
    <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
      <div className="grid grid-cols-1">
        <div className="flex justify-between content-center mb-4">
          <h1 className="text-3xl font-bold text-midnight">
            {date?.split("_")?.join(" ")}
          </h1>
          {reports[user] ? null : <NewReportButton user={user} />}
        </div>
        <table className="table-fixed text-midnight border-seperate">
          <thead className="text-lg">
            <tr>
              <th className="w-4/12 py-4">Sumbitted By</th>
              <th className="w-4/12 py-4">Entries</th>
              <th className="w-1/12 py-4">View</th>
              <th className="w-1/12 py-4">Edit</th>
              <th className="w-1/12 py-4">Delete</th>
            </tr>
          </thead>
          <tbody className="text-pine-green">
            <ShowReports reports={reports} user={user} date={date} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDate;
