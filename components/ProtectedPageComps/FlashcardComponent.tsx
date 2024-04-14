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
      const{data: currwordid} = await supabase.from('Words2').select('id').eq('Vocab-English', currentWord)
      const { id } = currwordid![0];

      //this works but variable cannot be read in return since its scope is to the handlekeypress function. therefore no current way to display the current japanes ewordd to the screne
      //get japanese equivalent for current word to display on screen
      //const{data: currentwordjapequiv} = await supabase.from('Words2').select('Vocab-Japanese').eq('id', currwordid)
      //let stringcurrentwordjapequiv = JSON.stringify(currentwordjapequiv);
      //const currwordjapequiv = JSON.parse(stringcurrentwordjapequiv);
      

      //get current words's userwordid
      const { data: userwordid } = await supabase.from('UserWords').select('id').eq('userID', user.id).eq('words2ID', id)
      const { id: P } = userwordid![0];

      //gett bucket value for current word
      const { data: currentbucket } = await supabase.from('UserWords').select('bucket').eq('id', P).eq('userID', user.id)
     
      //make int holding json currentbucket
      const { bucket: numbucket } = currentbucket![0];
     
      //getting first time int ( 0 or 1 )
      const { data: firsttime } = await supabase.from('UserWords').select('First_Time').eq('id', P)

      //make int holding firsttime int
      let stringfirsttime = JSON.stringify(firsttime);
      let firsttimeobj = JSON.parse(stringfirsttime);
      let newfirsttime = Number(!firsttimeobj.First_Time);

      

//if correct
      if (inputValue.trim() === currentWord) {

        if(newfirsttime == 1){
          console.log("is first time");
          //raise bucket value by 1 if bucket is less than 15
          if(numbucket<10){
            const { error } = await supabase.from('UserWords').update({bucket: numbucket+1}).eq('id', P)
           
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
        const { error: any } = await supabase.from('UserWords').update({reviewDate: newdate}).eq('id', P)

        setCompletedWords([...completedWords, currentWord]);
        const newWords = remainingWords.filter(word => word !== currentWord);
        setRemainingWords(newWords);
        setInputValue('');
        setIsCorrect(true);

        //setting firsttime back to default true for next time they review this word
        const { error } = await supabase.from('UserWords').update({First_Time: 1}).eq('id', P)
       

//if wrong
      } else {
        if(newfirsttime == 1){
          console.log("is first time");
          //lower bucket value by 1 if bucket is greater than 1 and less than 5
          if(numbucket>1 && numbucket<5){
            const { error } = await supabase.from('UserWords').update({bucket: numbucket-1}).eq('id', P)
           
          } 
          else if(numbucket>=5){ //lower bucket value by 2 if it is 5 and up
            const { error } = await supabase.from('UserWords').update({bucket: numbucket-2}).eq('id', P)
            
          }

          
          //setting firsttime to false since they got it wrong on their first time
          const { error } = await supabase.from('UserWords').update({First_Time: 0}).eq('id', P)
          
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
    <div>
      <h2>Type the english equivalent: kanji goes here</h2>
      <div>
        
      </div>
      {remainingWords.length > 0 && (
        <div>
          <p>Answer remove this section later: {currentWord}</p>
          {isCorrect && <p style={{ color: 'green' }}>Correct! Well done!</p>}
          {isIncorrect && <p style={{ color: 'red' }}>Wrong! The correct answer was: {lastword}</p>}
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
