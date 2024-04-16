"use client"
import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import { createClient } from "@/utils/supabase/client";

import { useState, useEffect } from "react";

export default function VocabLessons() {
    const [loading, setLoading] = useState(true);
    const [newWordsID, setNewWordsID] = useState<{ id: any }[] | null>(null);
    const supabase = createClient();
  
    useEffect(() => {
        

        fetchData();
    }, []);
    async function fetchData() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            
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
            setNewWordsID(fetchedWordsID);
            const newwordarr = fetchedWordsID!.map(obj => obj.id);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error, e.g., show an error message to the user
        } finally {
            setLoading(false);
        }
       
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full">
            <ExitButton />
            {/* Render the fetched words here */}
            <div>
                {newWordsID && newWordsID.map(word => (
                    <div key={word.id}>{/* Render each word here */}</div>
                ))}
            </div>
        </main>
    );
}
