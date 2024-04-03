"use client"
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

const DictionaryPage = () => {
  const [searchWord, setSearchWord] = useState('');
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [wordInfo, setWordInfo] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchWordSuggestions = async () => {
      try {
        let allWords: string[] = [];

        let { data: words, error } = await supabase
          .from('Words2')
          .select('Vocab-English')
          .order('Old Opt Sort', { ascending: true }) // Order by 'Old Opt Sort' column
          .range(0, 9000);

        while (words && words.length > 0) {
          allWords = allWords.concat(words.map((word: any) => word['Vocab-English']));

          // Provide a type assertion here
          const lastWordSort = words.length > 0 ? (words[words.length - 1] as any)['Old Opt Sort'] : null;

          ({ data: words, error } = await supabase
            .from('Words2')
            .select('Vocab-English')
            .order('Old Opt Sort', { ascending: true }) // Order by 'Old Opt Sort' column
            .gt('Old Opt Sort', lastWordSort) // Greater than 'Old Opt Sort' of last fetched word
            .range(0, 100)); // Next range
        }

        setWordSuggestions(allWords);
      } catch (error) {
        console.error('Error fetching word suggestions:', error);
        setWordSuggestions([]);
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
    <div>
      <input
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
      <button onClick={handleSearch}>Search</button>
      {wordInfo && (
        <div>
          <h2>{searchWord}</h2>
          <p>Japanese Equivalent: {wordInfo['Vocab-Japanese']}</p>
          <p>Part of Speech: {wordInfo['Part-of-Speech']}</p>
          <p>Sentence-Japanese: {wordInfo['Sentence-Japanese']}</p>
          <p>Sentence-English: {wordInfo['Sentence-English']}</p>
          <p>Vocab-Furigana: {wordInfo['Vocab-Furigana']}</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
