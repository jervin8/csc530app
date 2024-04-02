"use client"
import React, { useState, useEffect } from 'react';

interface Props {
  words: string[];
}

const FlashcardComponent: React.FC<Props> = ({ words }) => {
  const [inputValue, setInputValue] = useState('');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(words);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  // Derive current word from remaining words
  const currentWord = remainingWords.length > 0 ? remainingWords[0] : '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsIncorrect(false); // Reset incorrect message on input change
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() === currentWord) {
        setCompletedWords([...completedWords, currentWord]);
        const newWords = remainingWords.slice(1);
        setRemainingWords(newWords); // Update the remaining words
        setInputValue('');
      } else {
        // If the input is incorrect, show incorrect message
        setIsIncorrect(true);
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (completedWords.length === words.length) {
      // If all words are completed, redirect to the '/protected' page
      setTimeout(() => {
        window.location.href = '/protected';
      }, 2000); // Redirect after 2 seconds
    }
  }, [completedWords, words]);

  return (
    <div>
      <h2>Flashcard</h2>
      <div>
        <p>Remaining Words Array: {JSON.stringify(remainingWords)}</p>
      </div>
      {remainingWords.length > 0 && (
        <div>
          <p>Type the word: {currentWord}</p>
          {isIncorrect && <p style={{ color: 'red' }}>Incorrect! Please try again.</p>}
          <input
            type="text"
            className='text-black'
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <p>{completedWords}</p>
        </div>
      )}
      {completedWords.length === words.length && (
        <p>Congratulations! You have completed all the words! Redirecting...</p>
      )}
    </div>
  );
};

export default FlashcardComponent;
