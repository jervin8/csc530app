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

    ////gets words that are due for review for the currently logged in user
    const { data: japwords, error: wordsError } = await supabase.from('Kanji').select('kanji').in('id', kanjiids);

    // Mapping the fetched japanese words to be displayed into an array
    const wordValues = japwords!.map((japword: any) => japword['kanji']);

    //gets english word equivalent to the japanese word
    const { data: engword, error: endwordError } = await supabase.from('Kanji').select('keyword_6th_ed').in('id', kanjiids);

    //maps the fetched english words into array
    const engwordarr = engword!.map((word: any) => word['keyword_6th_ed']);



return(
  <main  className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <ExitButton />

    <p>{JSON.stringify(wordValues)}</p>
    <p>{JSON.stringify(engwordarr)}</p>

    <KanjiFlashcardComponent words={engwordarr} />

  </main>
)
}