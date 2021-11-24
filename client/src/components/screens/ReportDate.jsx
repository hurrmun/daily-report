import { useParams } from "react-router-dom";

const ReportDate = () => {
  const { date } = useParams();

  const EditButton = () => {
    return (
      <button className="bg-shamrock-green rounded text-white font-bold py-2 px-4 hover:bg-brown-sugar">
        Edit
      </button>
    );
  };

  return (
    <div>
      <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
        <div className="grid grid-cols-1">
          <h1 className="text-3xl font-bold text-midnight pb-4">
            {date.split("_").join(" ")}
          </h1>
          <table className="table-fixed text-midnight border-seperate">
            <thead className="text-lg">
              <th className="w-4/12">Sumbitted By</th>
              <th className="w-4/12">Entries</th>
              <th className="w-1/12">View</th>
              <th className="w-1/12">Edit</th>
              <th className="w-1/12">Delete</th>
            </thead>
            <tbody className="text-pine-green">
              <tr className="border rounded border-shamrock-green">
                <td className="py-4 my-4 text-center font-bold">
                  Punggol Plant
                </td>
                <td className="py-4 text-center">Entries: 10</td>
                <td className="py-4 text-center">
                  <EditButton />
                </td>
                <td className="py-4 text-center">
                  <EditButton />
                </td>
                <td className="py-4 text-center">Delete</td>
              </tr>
              <tr className="border rounded border-shamrock-green py-4">
                <td className="py-4 text-center font-bold">Punggol Plant</td>
                <td className="py-4 text-center">Entries: 10</td>
                <td className="py-4 text-center">
                  <EditButton />
                </td>
                <td className="py-4 text-center">
                  <EditButton />
                </td>
                <td className="py-4 text-center">Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDate;
