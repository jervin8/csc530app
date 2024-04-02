"use client"
import React, { useState, useEffect } from 'react';

interface Props {
  words: string[];
}

const FlashcardComponent: React.FC<Props> = ({ words }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);
  const [inputValue, setInputValue] = useState('');
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() === currentWord) {
        setCompletedWords([...completedWords, currentWord]);
        if (wordIndex + 1 < words.length) {
          setWordIndex(wordIndex + 1);
          setInputValue('');
          setCurrentWord(words[wordIndex + 1]);
        }
      } else {
        setInputValue('');
        const updatedWords = [...words.slice(1), currentWord]; // Move incorrect word to the end
        setCurrentWord(updatedWords[0]); // Set current word to the first word in the updated array
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
      {words.length > 0 && (
        <div>
          <p>Type the word: {currentWord}</p>
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
