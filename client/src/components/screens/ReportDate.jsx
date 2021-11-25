import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReportDate = (props) => {
  const { date } = useParams();
  const [reports, setReports] = useState({});
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const date = props.selectedDate;
    const fetchEntiresByDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          `/api/private/getEntries/${date}`,
          config
        );
        setReports(data.data.entries);
        setUser(data.data.user.username);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchEntiresByDate();
  });

  const ShowReports = (props) => {
    const Report = (props) => {
      const ReportButton = (props) => {
        return (
          <button className="bg-shamrock-green rounded text-white font-bold py-2 px-4 hover:bg-brown-sugar">
            {props.function}
          </button>
        );
      };

      return (
        <tr className="border rounded border-shamrock-green">
          <td className="py-4 my-4 text-center font-bold">{props.username}</td>
          <td className="py-4 text-center">Entries: {props.entries}</td>
          <td className="py-4 text-center">
            <ReportButton function="view" />
          </td>
          <td className="py-4 text-center">
            {props.currentUser === props.username ? (
              <ReportButton function="edit" />
            ) : (
              ""
            )}
          </td>
          <td className="py-4 text-center">
            {props.currentUser === props.username ? (
              <ReportButton function="edit" />
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    };

    const reports = [];
    for (const report in props.reports) {
      reports.push(
        <Report
          username={report}
          entries={props.reports[report]}
          currentUser={props.user}
          key={report}
        />
      );
    }
    return <>{reports}</>;
  };

  const NewEditButton = (props) => {
    return (
      <>
        <button className="bg-pine-green rounded text-white text-xl font-bold py-2 px-4 hover:bg-brown-sugar">
          {props.function} report
        </button>
      </>
    );
  };

  return (
    <div>
      <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
        <div className="grid grid-cols-1">
          <div className="flex justify-between content-center mb-4">
            <h1 className="text-3xl font-bold text-midnight">
              {date?.split("_")?.join(" ")}
            </h1>
            <NewEditButton function="new" />
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
              <ShowReports reports={reports} user={user} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDate;
