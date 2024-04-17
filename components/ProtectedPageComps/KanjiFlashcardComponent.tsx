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
  const [currwordJap, setCurrwordJap] = useState<string | null>(null); // State to hold the Japanese equivalent


  const supabase = createClient();

  useEffect(() => {
    // Set the current word to the first word in the remainingWords array
    if (remainingWords.length > 0) {
      setCurrentWordIndex(0);
    }


  }, [remainingWords]);



  const currentWord = remainingWords[currentWordIndex % remainingWords.length];

  const fetchWordJapanese = async (word: string) => {
    try {
      const { data, error } = await supabase
        .from('Kanji')
        .select('kanji')
        .eq('keyword_6th_ed', word)
        .single();

      if (error) {
        throw error;
      }

      if (data && 'kanji' in data) {
        const kanji: string = data['kanji'] as string;
        setCurrwordJap(kanji);
      } else {
        console.error('Error: kanji not found in data');
      }
    } catch (error) {
      console.error('Error fetching kanji:', error);
    }
  };


  useEffect(() => {
    fetchWordJapanese(currentWord); // Fetch Japanese equivalent when currentWord changes
  }, [currentWord]);

  //setting last word = to last word in remaining words array since that is where the most recent wrong answer was
  const lastword = remainingWords[remainingWords.length - 1]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsCorrect(false);
    setIsIncorrect(false);
  };

  //async function that handles if answer is right or wrong and handles updatiung data accordingly
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      //getting user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }



      //getting todays date
      var myDate = new Date();


      //get words2id for current word
      const{data: currwordid} = await supabase.from('Kanji').select('id').eq('keyword_6th_ed', currentWord)
      const { id } = currwordid![0];

      //get current words's userwordid
      const { data: userwordid } = await supabase.from('UserKanji').select('id').eq('userID', user.id).eq('kanjiID', id)
      const { id: P } = userwordid![0];

      //gett bucket value for current word
      const { data: currentbucket } = await supabase.from('UserKanji').select('bucket').eq('id', P).eq('userID', user.id)

      //make int holding json currentbucket
      const { bucket: numbucket } = currentbucket![0];

      //getting first time int ( 0 or 1 )
      const { data: firsttime } = await supabase.from('UserKanji').select('First_Time').eq('id', P)

      //make int holding firsttime int
      const { First_Time: newfirsttime } = firsttime![0];
      console.log(newfirsttime);


//if correct
      if (inputValue.trim() === currentWord) {

        if(newfirsttime == 1){
          console.log("is first time");
          //raise bucket value by 1 if bucket is less than 15
          if(numbucket<10){
            const { error } = await supabase.from('UserKanji').update({bucket: numbucket+1}).eq('id', P)
          }

          //update mydate to match new bucket date
          switch(numbucket) {
            case 1:
              myDate.setDate(myDate.getDate() + 1) // if it was in bucket 1 and they got it right it moves to bucket 2 and adds 1 day to reveiw date
              break;
            case 2:
              myDate.setDate(myDate.getDate() + 1) // adding number
              break;
            case 3:
              myDate.setDate(myDate.getDate() + 2) // adding number
              break;
            case 4:
              myDate.setDate(myDate.getDate() + 4) // adding number
              break;
            case 5:
              myDate.setDate(myDate.getDate() + 7) // adding number
              break;
            case 6:
              myDate.setDate(myDate.getDate() + 14) // adding number
              break;
            case 7:
              myDate.setDate(myDate.getDate() + 30) // adding number
              break;
            case 8:
              myDate.setDate(myDate.getDate() + 90) // adding number
              break;
            case 9:
              myDate.setDate(myDate.getDate() + 120) // adding number
              break;
            case 10:
              myDate.setDate(myDate.getDate() + 200) // adding number
              break;
            default:
              console.log("error new bucket value doesnt match any possible bucket(1-10)");
          }
        } else {
          //update mydate to match new bucket date
          switch(numbucket) {
            case 1:
              myDate.setDate(myDate.getDate() + 1) // if it was in bucket 1 and they got it wrong it stays in bucket 1 and adds 1 day to reveiw date
              break;
            case 2:
              myDate.setDate(myDate.getDate() + 1) // if it was in bucket 2 and they got it wrong it goes down 1 bucket and adds 1 day to review date
              break;
            case 3:
              myDate.setDate(myDate.getDate() + 1) // adding number
              break;
            case 4:
              myDate.setDate(myDate.getDate() + 1) // adding number
              break;
            case 5:
              myDate.setDate(myDate.getDate() + 1) // adding number
              break;
            case 6:
              myDate.setDate(myDate.getDate() + 2) // adding number
              break;
            case 7:
              myDate.setDate(myDate.getDate() + 4) // adding number
              break;
            case 8:
              myDate.setDate(myDate.getDate() + 7) // adding number
              break;
            case 9:
              myDate.setDate(myDate.getDate() + 14) // adding number
              break;
            case 10:
              myDate.setDate(myDate.getDate() + 30) // adding number
              break;
            default:
              console.log("error new bucket value doesnt match any possible bucket(1-15)");
          }
        }

        //update userwords review date to be the new date decided in switch statement
        let newdate = myDate.toISOString().slice(0, 10)
        const { error: any } = await supabase.from('UserKanji').update({reviewDate: newdate}).eq('id', P)

        setCompletedWords([...completedWords, currentWord]);
        const newWords = remainingWords.filter(word => word !== currentWord);
        setRemainingWords(newWords);
        setInputValue('');
        setIsCorrect(true);

        //setting firsttime back to default true for next time they review this word
        const { error } = await supabase.from('UserKanji').update({First_Time: 1}).eq('id', P)


//if wrong
      } else {
        if(newfirsttime == 1){
          console.log("is first time");
          //lower bucket value by 1 if bucket is greater than 1 and less than 5
          if(numbucket>1 && numbucket<5){
            const { error } = await supabase.from('UserKanji').update({bucket: numbucket-1}).eq('id', P)

          }
          else if(numbucket>=5){ //lower bucket value by 2 if it is 5 and up
            const { error } = await supabase.from('UserKanji').update({bucket: numbucket-2}).eq('id', P)

          }


          //setting firsttime to false since they got it wrong on their first time
          const { error } = await supabase.from('UserKanji').update({First_Time: 0}).eq('id', P)

        }


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
    <div className="h-screen ">
      <div className="text-center h-1/3">
        <div className="bg-slate-700 dark:bg-gray-200 text-white dark:text-black h-3/4 text-8xl w-full flex justify-center items-center">
          {currwordJap}
        </div>
        <div className="text-2xl bg-gray-300 text-black h-1/5 w-full flex justify-center items-center">
          {remainingWords.length > 0 && (
            <div>
            {isCorrect && <p style={{ color: 'green' }}>Correct! Well done!</p>}
            {isIncorrect && <p style={{ color: 'red' }}>Wrong! The correct answer was: {lastword}</p>}
            </div>
          )}
        </div>
      </div>

      {remainingWords.length > 0 && (
        <div className="flex justify-center items-center text-center">
          <div className="w-full">
            <input
              type="text"
              className='text-black w-11/12 p-2 text-3xl rounded-2xl text-center'
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      )}
      {completedWords.length === words.length && (
          <div className="text-center">
            <p className="text-xl">Congratulations! You have completed all the words! Redirecting...</p>
          </div>
      )}
    </div>
  );
};

export default FlashcardComponent;
