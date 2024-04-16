"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

const DictionaryPage = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [wordInfo, setWordInfo] = useState<any>(null);
  const [numWordsFetched, setNumWordsFetched] = useState<number>(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchWordSuggestions = async () => {
      try {
        let allWords: string[] = [];

        let { data: words, error } = await supabase
          .from('Words2')
          .select('Vocab-English')
          .order('id', { ascending: true })
          .range(0, 1000); // Fetch the first 1000 words

        if (error) {
          throw error;
        }

        if (words && words.length > 0) {
          allWords = words.map((word: any) => word['Vocab-English']);
          setWordSuggestions(allWords);
          setNumWordsFetched(allWords.length);
        }

        // Fetch the next batches of 1000 words until reaching 9567
        let offset = 1000;
        while (allWords.length < 9567) {
          const { data: nextWords } = await supabase
            .from('Words2')
            .select('Vocab-English')
            .order('id', { ascending: true })
            .range(offset, offset + 1000);

          if (nextWords && nextWords.length > 0) {
            allWords = allWords.concat(nextWords.map((word: any) => word['Vocab-English']));
            setWordSuggestions(allWords);
            setNumWordsFetched(allWords.length);
            offset += 1000;
          } else {
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching word suggestions:', error);
        setWordSuggestions([]);
        setNumWordsFetched(0);
      }
    };

    fetchWordSuggestions();
  }, []);

  const fetchWordInfo = async (word: string) => {
    try {
      const { data, error } = await supabase
        .from('Words2')
        .select('*')
        .eq('Vocab-English', word.toLowerCase())
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

  const handleSearch = async () => {
    fetchWordInfo(searchWord);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToUserWords = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const today = new Date().toISOString().slice(0, 10);
  
      // Check if the word already exists for the user
      const existingWord = await supabase
        .from('UserWords')
        .select('*')
        .eq('userID', user!.id)
        .eq('words2ID', wordInfo.id)
        .single();
  
      if (existingWord.error) {
        throw existingWord.error;
      }
  
      if (!existingWord.data) {
        // If the word doesn't exist, insert it into UserWords
        const { error } = await supabase.from('UserWords').insert({
          userID: user!.id,
          words2ID: wordInfo.id,
          reviewDate: today
        });
  
        if (error) {
          console.error('Error adding word to user words:', error);
        } else {
          console.log('Word added to user words successfully!');
        }
      } else {
        console.log('Word already exists in user words.');
      }
    } catch (error) {
      console.error('Error adding word to user words:', error);
    }
  };
  

  return (
    <div className="">
      <div className="text-lg text-black dark:text-white">Number of words fetched for suggestions: {numWordsFetched}</div>
      <div className="flex items-center mt-5">
        <input
          className='text-black w-full mr-2 py-2 px-4 border border-gray-300 rounded-lg'
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyPress={handleKeyPress}
          list="wordSuggestions"
        />
        <datalist id="wordSuggestions">
          {wordSuggestions.map((word, index) => (
            <option key={index} value={word} />
          ))}
        </datalist>
        <button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-xl">Search</button>
      </div>
      {wordInfo && wordInfo['Vocab-English'].trim() !== '' && (
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
          <button onClick={handleAddToUserWords} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-xl mt-4">Add to My Words</button>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
