import React, { useState, useEffect } from "react";

const Countdown = () => {
  // Calculate the target date (1.5 months from today)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45); // 1.5 months = approx. 45 days

  // Initialize state to store the remaining time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to calculate the time left
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update the countdown every second
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voyex Launching In...</h1>
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
        {timeLeft.seconds} Seconds
      </div>
    </div>
  );
};

export default Countdown;
