import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import KanjiReviewButton from "@/components/ProtectedPageComps/KanjiReviewButton";
import VocabReviewButton from "@/components/ProtectedPageComps/VocabReviewButton";
import VocabLessonButton from "@/components/ProtectedPageComps/VocabLessonButton";
import KanjiLessonButton from "@/components/ProtectedPageComps/KanjiLessonButton";
import WordCountGraph from "@/components/ProtectedPageComps/WordCountGraph";
import ReviewForecast from "@/components/ProtectedPageComps/ReviewForecast";


export default async function Dashboard() {
  const supabase = createClient();

  //redirects to login page if not an authenticated/logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  //selects users
  const { data: Users } = await supabase.from("Users").select();
  const { data: userkanjiids} = await supabase.from('UserKanji').select('kanjiID').eq('userID', user.id)
  const { data: userwordsids } = await supabase.from('UserWords').select('words2ID').eq('userID', user.id)
  const wordcount = userwordsids?.length;
  const kanjicount = userkanjiids?.length;
console.log(userkanjiids)
console.log(wordcount)
return (
  <main className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <Navbar/>
    <div className="pb-10">
      <div className="w-3/4 h-full container m-auto grid grid-cols-6 grid-rows-3 p-10 py-5 gap-10 place-items-center">

        <div className="w-full rounded-lg bg-indigo-600 col-span-2 p-10">
          <div className="text-2xl h-3/4 text-white">
            <p>Vocab</p>
            {"Reviews Due Today: "+wordcount}
          </div>
          <div className="flex justify-end items-end p-9 pb-0 pr-0 mt-9 ml-9">
            <VocabLessonButton />
            <VocabReviewButton />
          </div>
        </div>

        <div className="w-full rounded-lg bg-indigo-600 col-span-2 p-9 flex flex-col justify-between">
          <div className="text-2xl h-3/4 text-white">
            <p>Kanji</p>
            {"Reviews Due Today: "+kanjicount}
          </div>
          <div className="flex justify-end items-end p-9 pb-0 pr-0 mt-9 ml-9">
            <KanjiLessonButton />
            <KanjiReviewButton />
          </div>
        </div>

        {/*Review forcast type thing here. take up two rows in the third colmn slot*/}
        <div className="w-full rounded-lg bg-indigo-600 col-span-2 text-white text-lg">
          <ReviewForecast />
        </div>

        <div className=" bg-white text-black w-full rounded-lg p-5 col-span-6 row-span-2">
          <WordCountGraph />
        </div>
      </div>
    </div>

    <Footer />

  </main>
)
}

