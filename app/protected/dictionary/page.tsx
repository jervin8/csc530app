"use client"
import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";


const DictionaryPage = () => {
  const [searchWord, setSearchWord] = useState('');
  const [wordInfo, setWordInfo] = useState<any>(null); // Change the type to any temporarily
  const supabase = createClient();

  const handleSearch = async () => {
    try {
      // Query Supabase for the word information
      const { data, error } = await supabase
        .from('Words2')
        .select('"Vocab-Japanese"') // Wrap the column name in double quotes
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

  return (
    <div>
      <input type="text" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {wordInfo && (
        <div>
          <p>Japanese Equivalent: {wordInfo['Vocab-Japanese']}</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
