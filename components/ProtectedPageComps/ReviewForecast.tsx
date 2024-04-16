// components/ReviewForecast.js

import React from 'react';

function ReviewForecast() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const currentDay = daysOfWeek[currentDayIndex];

  // Generate a list of the remaining days of the week
  const remainingDays = daysOfWeek.slice(currentDayIndex + 1).concat(daysOfWeek.slice(0, currentDayIndex));

  return (
    <div className="m-auto p-5">
      <h1>Review Forecast</h1>
      <p>Today: 0</p>
      <ul>
        {/*Gonna turn these into components eventually that recieves review related stuff from DB*/}
        {remainingDays.map((day, index) => (
          <li key={index}>{day}: 0</li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewForecast;
