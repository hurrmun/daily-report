import Entry from "./Entry";

const ShowEntries = (props) => {
  const entries = props.entries;
  console.log(entries);

  const allEntries = entries.map((item) => {
    return (
      <Entry
        key={item.entry_id}
        material={item.material}
        supplier={item.supplier}
        ordered_load={item.ordered_load}
        received_load={item.received_load}
        quantity={item.quantity}
        remarks={item.remarks}
      />
    );
  });

  return <>{allEntries}</>;
};

export default ShowEntries;
