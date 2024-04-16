"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Props {
  words: number[];
}

const LessonsWordsDisplay: React.FC<Props> = ({ words }) => {
  const [wordInfo, setWordInfo] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current index of the words array
  const [isLastWord, setIsLastWord] = useState<boolean>(false); // Track if the current word is the last one
  const supabase = createClient();

  
  useEffect(() => {
    
    fetchWordInfo(words[currentIndex]); // Fetch initial word info
    setIsLastWord(currentIndex === words.length - 1); // Check if the current word is the last one
  }, [currentIndex]); // Re-fetch word info when currentIndex changes

  const fetchWordInfo = async (id: number) => {
    try {
      
      const { data, error } = await supabase
        .from('Words2')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching word information:', error);
        setWordInfo(null);
      } else if (data) {
        setWordInfo(data);
      } else {
        console.error('Word not found');
        setWordInfo(null);
      }
    } catch (error) {
      console.error('Error fetching word information:', error);
      setWordInfo(null);
    }
  };

  const handleNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next word
    }
  };

  const handlePreviousWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous word
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const today = new Date().toISOString().slice(0, 10);
  
      for (const wordId of words) {
        const { data: wordData, error } = await supabase
          .from('Words2')
          .select('*')
          .eq('id', wordId)
          .single();
  
        if (error) {
          console.error('Error fetching word information:', error);
        } else if (wordData) {
          
            const { error: insertError } = await supabase.from('UserWords').insert({
              userID: user!.id,
              words2ID: wordData.id,
              reviewDate: today
            });
            window.location.href = '/protected';
            if (insertError) {
              console.error('Error inserting user word:', insertError);
            }
          
        } else {
          console.error('Word not found');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="">
      {wordInfo && (
        <div className="bg-white text-black mt-5 p-10 rounded-lg">
          <div className="text-2xl">
            <div className="text-4xl">
              {wordInfo['Vocab-English'].charAt(0).toUpperCase() + wordInfo['Vocab-English'].slice(1)}
            </div>
            <hr className="my-2 border-black"></hr>
            <div className="flex items-center">Kanji Composition:<div className=" ml-4 text-4xl">{wordInfo['Vocab-Japanese']}</div></div>
            <div className="flex items-center">Part of Speech: <div className=" ml-4 text-3xl">{wordInfo['Part of Speech'].charAt(0).toUpperCase() + wordInfo['Part of Speech'].slice(1)}</div></div>
            <div className="flex items-center">Sentence-Japanese: <div className=" ml-4 text-3xl">{wordInfo['Sentence-Japanese']}</div></div>
            <div className="flex items-center">Sentence-English: <div className=" ml-4 text-3xl">{wordInfo['Sentence-English']}</div></div>
            <div className="flex items-center">Vocab-Furigana:  <div className=" ml-4 text-3xl">{wordInfo['Vocab-Furigana']}</div></div>
          </div>
        </div>
      )}
      <div>
        <button onClick={handlePreviousWord} disabled={currentIndex === 0}>Previous</button>
        {isLastWord ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNextWord}>Next</button>
        )}
      </div>
    </div>
  );
};

export default LessonsWordsDisplay;
