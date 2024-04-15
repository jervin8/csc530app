import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import WordGame from "@/components/ProtectedPageComps/VocabFlashcardComponent";
import FlashcardComponent from "@/components/ProtectedPageComps/VocabFlashcardComponent";
import KanjiFlashcardComponent from "@/components/ProtectedPageComps/KanjiFlashcardComponent";

export default async function KanjiReviews() {
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

    //gets kanjiids that are due for review for the currently logged in user
    const { data: userkanjiids, error } = await supabase.from('UserKanji').select('kanjiID').eq('userID', user.id).lte('reviewDate', today)

    //after this line of code executes, kanjiids will be an array containing only the kanjiID values extracted from the objects fetched from the 'UserKanji' table. /
    const kanjiids = userkanjiids!.map(UserKanji => UserKanji.kanjiID);

    //all of the above is finished -------------------------------------------------------------

    ////gets words that are due for review for the currently logged in user
    const { data: words, error: wordsError } = await supabase.from('Words2').select('Vocab-Japanese').in('id', kanjiids);

    // Mapping the fetched japanese words to be displayed into an array
    const wordValues = words!.map((word: any) => word['Vocab-Japanese']);

    //gets english word equivalent to the japanese word
    const { data: engword, error: endwordError } = await supabase.from('Words2').select('Vocab-English').in('id', kanjiids);

    //maps the fetched english words into array
    const engwordarr = engword!.map((word: any) => word['Vocab-English']);


return(
  <main>
    <ExitButton />

    <p>{JSON.stringify(wordValues)}</p>
    <p>{JSON.stringify(engwordarr)}</p>

    <KanjiFlashcardComponent words={engwordarr} />

  </main>
)
}