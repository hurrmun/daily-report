import Report from "./Report";

const ShowReports = (props) => {
  const reports = [];
  for (const report in props.reports) {
    reports.push(
      <Report
        username={report}
        entries={props.reports[report]}
        currentUser={props.user}
        key={report}
        date={props.date}
      />
    );
  }
  return <>{reports}</>;
};

export default ShowReports;
