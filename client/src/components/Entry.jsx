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

export default Entry;
