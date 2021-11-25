import ReportButton from "./ReportButton";

const Report = (props) => {
  return (
    <tr className="border rounded border-shamrock-green">
      <td className="py-4 my-4 text-center font-bold">{props.username}</td>
      <td className="py-4 text-center">Entries: {props.entries}</td>
      <td className="py-4 text-center">
        <ReportButton
          function="view"
          date={props.date}
          username={props.username}
        />
      </td>
      <td className="py-4 text-center">
        {props.currentUser === props.username ? (
          <ReportButton
            function="edit"
            date={props.date}
            username={props.username}
          />
        ) : (
          ""
        )}
      </td>
      <td className="py-4 text-center">
        {props.currentUser === props.username ? (
          <button
            onClick={props.handleDelete}
            className="bg-shamrock-green rounded text-white font-bold py-2 px-4 hover:bg-brown-sugar"
          >
            delete
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default Report;
