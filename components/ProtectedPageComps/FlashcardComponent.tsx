"use client"
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from 'react';

interface Props {
  words: string[];
}

const FlashcardComponent: React.FC<Props> =  ({ words }) => {
  const [inputValue, setInputValue] = useState('');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(words);
  const [missedWords, setMissedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const supabase = createClient();
    
  useEffect(() => {
    // Set the current word to the first word in the remainingWords array
    if (remainingWords.length > 0) {
      setCurrentWordIndex(0);
    }
  }, [remainingWords]);

  const currentWord = remainingWords[currentWordIndex % remainingWords.length];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsCorrect(false);
    setIsIncorrect(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (inputValue.trim() === currentWord) {
        setCompletedWords([...completedWords, currentWord]);
        const newWords = remainingWords.filter(word => word !== currentWord);
        setRemainingWords(newWords);
        setInputValue('');
        setIsCorrect(true);
      } else {
        setIsIncorrect(true);
        setMissedWords([...missedWords, currentWord]);
        const newWords = remainingWords.filter(word => word !== currentWord);
        setRemainingWords([...newWords, currentWord]);
        setInputValue('');
      }
      setCurrentWordIndex(currentWordIndex + 1); // Move to the next word regardless of correctness
    }
  };

  useEffect(() => {
    if (remainingWords.length === 0 && missedWords.length > 0) {
      setRemainingWords([...missedWords]);
      setMissedWords([]);
    }
  }, [remainingWords, missedWords]);

  useEffect(() => {
    if (completedWords.length === words.length) {
      setTimeout(() => {
        window.location.href = '/protected';
      }, 2000);
    }
  }, [completedWords, words]);

  return (
    <div>
      <h2>Flashcard</h2>
      <div>
        
      </div>
      {remainingWords.length > 0 && (
        <div>
          <p>Type the word: {currentWord}</p>
          {isCorrect && <p style={{ color: 'green' }}>Correct! Well done!</p>}
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
