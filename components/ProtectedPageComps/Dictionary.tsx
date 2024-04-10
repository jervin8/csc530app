"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

const DictionaryPage = () => {
  const [searchWord, setSearchWord] = useState('');
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
          .order('Old Opt Sort', { ascending: true })
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
            .order('Old Opt Sort', { ascending: true })
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

  const handleSearch = async () => {
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

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="">
      <p>Number of words fetched for suggestions: {numWordsFetched}</p>
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
        <button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">Search</button>
      </div>
      <div className="bg-white mt-5 p-10 rounded-lg">
        {wordInfo && (
          <div>
            <div className="text-4xl">{searchWord.charAt(0).toUpperCase()+searchWord.slice(1)}</div>
            <div>Kanji Composition: {wordInfo['Vocab-Japanese']}</div>
            <div>Part of Speech: {wordInfo['Part of Speech']}</div>
            <div>Sentence-Japanese: {wordInfo['Sentence-Japanese']}</div>
            <div>Sentence-English: {wordInfo['Sentence-English']}</div>
            <div>Vocab-Furigana: {wordInfo['Vocab-Furigana']}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryPage;
