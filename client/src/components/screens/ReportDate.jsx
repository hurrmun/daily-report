import { useParams } from "react-router-dom";

const ReportDate = (props) => {
  const { date } = useParams();

  const ReportButton = (props) => {
    return (
      <button className="bg-shamrock-green rounded text-white font-bold py-2 px-4 hover:bg-brown-sugar">
        {props.function}
      </button>
    );
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
              {date.split("_").join(" ")}
            </h1>
            <NewEditButton function="new" />
          </div>
          <table className="table-fixed text-midnight border-seperate">
            <thead className="text-lg">
              <th className="w-4/12 py-4">Sumbitted By</th>
              <th className="w-4/12 py-4">Entries</th>
              <th className="w-1/12 py-4">View</th>
              <th className="w-1/12 py-4">Edit</th>
              <th className="w-1/12 py-4">Delete</th>
            </thead>
            <tbody className="text-pine-green">
              <tr className="border rounded border-shamrock-green">
                <td className="py-4 my-4 text-center font-bold">
                  Punggol Plant
                </td>
                <td className="py-4 text-center">Entries: 10</td>
                <td className="py-4 text-center">
                  <ReportButton function="view" />
                </td>
                <td className="py-4 text-center">
                  <ReportButton function="edit" />
                </td>
                <td className="py-4 text-center">
                  <ReportButton function="delete" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDate;
