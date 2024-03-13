"use client"
import { useState } from 'react';

//make it so this function takes an array of words as a parameter and then checks the word using isCorrect and if it is correct update words and bucket/duedate and remove from array of reviews that day
//if they get it wrong then just update due date to whateve rlower bucket is and shuffle the array indexes and go again but make sure they dont get the same one\
//make sure if they have alread ygotte nit wrong once that once they get it right and remove it from remove pool it is still counted as wrong on buckets and due dates(all that matters here is the first reponse)

//make it so that when they hit enter the text stays but once they click in the box again and start typing after having already submitted the last response it deletes that text and starts fresh


function ValidatingTextBox() {
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsCorrect(null); // Reset correctness state when input changes
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().toLowerCase() === 'battlepass') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleFormSubmit(event as unknown as React.FormEvent<HTMLFormElement>); // Cast event to FormEvent
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
      <div className="mb-5">
        <input
          type="text"
          id="username-success"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`bg-gray-100 border ${
            isCorrect === true
              ? 'border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500'
              : isCorrect === false
              ? 'border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500'
              : 'border-gray-300 text-gray-900 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400'
          } text-sm rounded-lg focus:ring-${
            isCorrect === true ? 'green' : isCorrect === false ? 'red' : 'gray'
          }-500 focus:border-${
            isCorrect === true ? 'green' : isCorrect === false ? 'red' : 'gray'
          }-500 block w-full p-2.5 dark:bg-gray-700 dark:border-${
            isCorrect === true ? 'green' : isCorrect === false ? 'red' : 'gray'
          }-500`}
          placeholder=". . . ."
        />
        {isCorrect === true ? (
          <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            <span className="font-medium">Correct!</span> Keep Going!
          </p>
        ) : isCorrect === false ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Incorrect!</span> Try Again!
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default ValidatingTextBox;
