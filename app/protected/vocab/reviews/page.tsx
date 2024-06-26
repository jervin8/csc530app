import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import WordGame from "@/components/ProtectedPageComps/VocabFlashcardComponent";
import FlashcardComponent from "@/components/ProtectedPageComps/VocabFlashcardComponent";

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
    const { data: words, error: wordsError } = await supabase.from('Words2').select('Vocab-Japanese').in('id', wordIds);

    // Mapping the fetched japanese words to be displayed into an array
    const wordValues = words!.map((word: any) => word['Vocab-Japanese']);

    //gets english word equivalent to the japanese word
    const { data: engword, error: endwordError } = await supabase.from('Words2').select('Vocab-English').in('id', wordIds);

    //maps the fetched english words into array
    const engwordarr = engword!.map((word: any) => word['Vocab-English']);


return(
  <main  className="h-screen w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <ExitButton />

    <div className="w-full h-full">
      <FlashcardComponent words={engwordarr} />
    </div>

    <p>{JSON.stringify(engwordarr)}</p>
  </main>
)
}