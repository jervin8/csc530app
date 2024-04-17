// components/ReviewForecast.js

import React from 'react';

function ReviewForecast() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const currentDay = daysOfWeek[currentDayIndex];

  // Generate a list of the remaining days of the week
  const remainingDays = daysOfWeek.slice(currentDayIndex + 1).concat(daysOfWeek.slice(0, currentDayIndex));

  // Define an index signature for fakeReviewCounts
  interface ReviewCounts {
    [key: string]: number;
  }

  // Generate fake review counts for each day
  const fakeReviewCounts: ReviewCounts = {
    Sunday: 10,
    Monday: 15,
    Tuesday: 17,
    Wednesday: 19,
    Thursday: 4,
    Friday: 5,
    Saturday:9,
  };

  return (
    <div className="m-auto p-5">
      <h1>Review Forecast</h1>
      <p>{currentDay}: {fakeReviewCounts[currentDay]}</p>
      <ul>
        {/* Gonna turn these into components eventually that receive review related stuff from DB */}
        {remainingDays.map((day, index) => (
          <li key={index}>{day}: {fakeReviewCounts[day]}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewForecast;
