
import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import { createClient } from "@/utils/supabase/server";
import LessonsWordsDisplay from "@/components/ProtectedPageComps/LessonsWordsDisplay";
import { redirect } from "next/navigation";

import { useState } from "react";

export default async function VocabLessons() {
   
    const supabase = createClient();
  
    
        
    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
            
            
            const { data: userWordIDs } = await supabase.from('UserWords').select('words2ID').eq('userID', user!.id);
            const userwordarr = userWordIDs!.map(obj => obj.words2ID);
            const formattedString = `(${userwordarr.join(',')})`;

            const { data: fetchedWordsID } = await supabase
                .from('Words2')
                .select('id')
                .not('id', 'in', formattedString)
                .order('id', { ascending: true })
                .range(0, 4);

            console.log("New Word IDs:", fetchedWordsID);
           
            const newwordarr = fetchedWordsID!.map(obj => obj.id);
       
       
    


 
    return (
        <main className="w-full">
            <ExitButton />
            <LessonsWordsDisplay words={newwordarr} />
        </main>
    );
}
