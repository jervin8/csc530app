import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function VocabReviews() {
    const supabase = createClient();
  
    //redirects to login page if not an authenticated/logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    //getting date
    let today = new Date().toISOString().slice(0, 10)

    //gets wordids that are due for review for the currently logged in user
    const { data: userwordids, error } = await supabase.from('UserWords').select('words2ID').eq('userID', user.id).lte('reviewDate', today)

    //after this line of code executes, wordIds will be an array containing only the words2ID values extracted from the objects fetched from the 'UserWords' table. /
    const wordIds = userwordids!.map(userWord => userWord.words2ID);

    ////gets words that are due for review for the currently logged in user
    const { data: words, error: wordsError } = await supabase.from('Words2').select('Vocab-Japanese').in('Old Opt Sort', wordIds);

return(
  <main>
    <ExitButton />
    <p>{JSON.stringify(userwordids)}</p>
    <p>{JSON.stringify(words)}</p>
    <ValidatingTextBox />
  </main>
)
}