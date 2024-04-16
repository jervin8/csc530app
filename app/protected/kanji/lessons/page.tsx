
import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import { createClient } from "@/utils/supabase/server";
import LessonsKanjiDisplay from "@/components/ProtectedPageComps/LessonsKanjiDisplay";
import { redirect } from "next/navigation";

import { useState } from "react";

export default async function KanjiLessons() {
   
    const supabase = createClient();
  
    
        
    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
            
            
            const { data: userWordIDs } = await supabase.from('UserKanji').select('kanjiID').eq('userID', user!.id);
            const userkanjiarr = userWordIDs!.map(obj => obj.kanjiID);
            const formattedString = `(${userkanjiarr.join(',')})`;

            const { data: fetchedWordsID } = await supabase
                .from('Kanji')
                .select('id')
                .not('id', 'in', formattedString)
                .order('id', { ascending: true })
                .range(0, 4);

            console.log("New Kanji IDs:", fetchedWordsID);
           
            const newkanjiarr = fetchedWordsID!.map(obj => obj.id);
       
       
    


 
    return (
        <main className="w-full">
            <ExitButton />
            <LessonsKanjiDisplay words={newkanjiarr} />
        </main>
    );
}
