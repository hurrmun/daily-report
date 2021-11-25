import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Homepage = (props) => {
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  // const [privateData, setPrivateData] = useState("");
  const [date, setDate] = useState(withoutTime());

  useEffect(() => {
    setDate(withoutTime());
    if (!localStorage.getItem("authToken")) {
      navigate("/login", { replace: true });
    }
    props.setSelectedDate(withoutTime());
  }, [navigate]);

  const clickDayHandler = (date) => {
    setDate(date);
    props.setSelectedDate(date);
  };

  const clickButtonHandler = () => {
    let formattedDate = date.toString().split(" ").slice(1, 4).join("_");
    // console.log(date);
    navigate(`reports/${formattedDate}`);
  };

  function withoutTime() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  return (
    <>
      <div className="max-w-6xl lg:max-w-xl mx-auto pt-4 px-4 sm:pt-6 lg:px-8">
        <div className="grid justify-items-center">
          <div className="flex w-full">
            <Calendar
              calendarType="ISO 8601"
              view="month"
              onClickDay={(date) => clickDayHandler(date)}
              value={date}
              className="flex-grow rounded border-shamrock-green text-midnight text-xl justify-self-stretch px-10 tablet:px-32 py-4"
              tileClassName="rounded text-md"
            />
            {console.log(date)}
          </div>
          <button
            onClick={clickButtonHandler}
            className="mt-10 w-80 py-4 bg-shamrock-green text-white text-xl font-bold rounded hover:bg-brown-sugar"
          >
            Go to date
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
