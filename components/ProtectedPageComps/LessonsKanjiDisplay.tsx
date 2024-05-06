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
        .from('Kanji')
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
          .from('Kanji')
          .select('*')
          .eq('id', wordId)
          .single();

        if (error) {
          console.error('Error fetching word information:', error);
        } else if (wordData) {
            const { error: insertError } = await supabase.from('UserKanji').insert({
              userID: user!.id,
              kanjiID: wordData.id,
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
    <div className="h-screen">
    {wordInfo && (
      <div className="text-white dark:text-black rounded-lg text-2xl h-full bg-gray-200 dark:bg-slate-700">
          <div className="bg-slate-700 dark:bg-gray-200 text-8xl w-full h-1/3 flex justify-center items-center">
          {wordInfo['kanji'].charAt(0).toUpperCase() + wordInfo['kanji'].slice(1)}
          </div>
          <div className="bg-gray-300 p-5 h-1/12 grid grid-cols-2 text-black">
            <div className="flex justify-start items-center">
              {currentIndex !== 0 &&(<button onClick={handlePreviousWord} disabled={currentIndex === 0}>{"<--"} Previous</button>)}
            </div>
            <div className="flex justify-end items-center">
              {isLastWord ? (
                <button onClick={handleSubmit}>Submit</button>
              ) : (
                <button onClick={handleNextWord}>Next {"-->"}</button>
              )}
            </div>
        </div>
        <div className="text-black dark:text-white flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center text-4xl">Keyword: <div className=" m-4 text-5xl">{wordInfo['keyword_6th_ed']}</div></div>
            <div className="flex items-center text-3xl">Onyomi: <div className=" m-4 text-4xl">{wordInfo['on_reading']}</div></div>
            <div className="flex items-center text-3xl">Kunyomi: <div className=" m-4 text-4xl">{wordInfo['kun_reading']}</div></div>
            <div className="flex items-center text-3xl">JLPT: <div className=" m-4 text-4xl">{wordInfo['jlpt']}</div></div>
          </div>
        </div>

      </div>
    )}
  </div>
  );
};

export default LessonsWordsDisplay;
