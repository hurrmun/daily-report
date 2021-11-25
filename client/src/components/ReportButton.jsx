import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportButton = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(
          `/reports/${props.date}/${props.username}/${
            props.function === "edit" ? "edit" : ""
          }`,
          {
            replace: true,
          }
        )
      }
      className="bg-shamrock-green rounded text-white font-bold py-2 px-4 hover:bg-brown-sugar"
    >
      {props.function}
    </button>
  );
};

export default ReportButton;
