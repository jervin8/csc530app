"use client"
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from 'react';

interface Props {
  words: string[];
}
const LessonsWordsDisplay = React.FC<Props> =  ({ words }) => {
  const [searchWord, setSearchWord] = useState();
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [wordInfo, setWordInfo] = useState<any>(null);
  const [numWordsFetched, setNumWordsFetched] = useState<number>(0);
  const supabase = createClient();

  useEffect(() => {
    

    {/*I couldn't get the text box to not render so now it automatically renders dictionary, encyclopedia on page start up*/}
    const fetchInitialWordInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('Words2')
          .select('*')
          .eq('Vocab-English', searchWord.toLowerCase())
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

   
    fetchInitialWordInfo();
  }, []);

 

  

  return (
    <div className="">
      
        {wordInfo && wordInfo['Vocab-English'].trim() !== '' && (  // Check if wordInfo is not null and searchWord is not empty
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
      </div>
  );
};

export default LessonsWordsDisplay;
