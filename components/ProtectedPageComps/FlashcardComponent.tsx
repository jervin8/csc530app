"use client"
import React, { useState, useEffect } from 'react';

interface Props {
  words: string[];
}

const FlashcardComponent: React.FC<Props> = ({ words }) => {
  const [inputValue, setInputValue] = useState('');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(words);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const currentWord = remainingWords[currentWordIndex % remainingWords.length];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsIncorrect(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isCorrect = inputValue.trim() === currentWord;
      if (isCorrect) {
        setCompletedWords([...completedWords, currentWord]);
        const newWords = remainingWords.filter((_, index) => index !== currentWordIndex);
        setRemainingWords(newWords);
        setInputValue('');
      } else {
        setIsIncorrect(true);
        const movedWord = remainingWords[currentWordIndex % remainingWords.length];
        const newWords = remainingWords.filter(word => word !== movedWord);
        setRemainingWords([...newWords, movedWord]);
        setInputValue('');
      }
      setCurrentWordIndex(currentWordIndex + 1); // Move to the next word regardless of correctness
    }
  };

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
