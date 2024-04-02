"use client"

import React, { useState } from 'react';

interface WordGameProps {
  words: string[];
}

const WordGame: React.FC<WordGameProps> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const userInput: string = event.currentTarget.value.trim();
      event.currentTarget.value = ""; // Clear input field

      const currentWord: string = words[currentWordIndex];

      if (userInput.toLowerCase() === currentWord.toLowerCase()) {
        // Correct answer, remove the word from array and move to the next word
        const newWords = [...words];
        newWords.splice(currentWordIndex, 1);
        setCurrentWordIndex(currentWordIndex);
      } else {
        // Incorrect answer, move the word to the back of the array
        const removedWord: string = words.splice(currentWordIndex, 1)[0];
        const newWords = [...words, removedWord];
        setCurrentWordIndex(currentWordIndex);
      }

      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };

  return (
    <div>
      {words.length > 0 ? (
        <>
          <div>Type the word: {words[currentWordIndex]}</div>
          <input type="text" className="text-black" onKeyDown={handleInput} autoFocus />
        </>
      ) : (
        <div>Congratulations! You have completed all words.</div>
      )}
    </div>
  );
};

export default WordGame;