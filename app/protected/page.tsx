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

return (
  <main className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <Navbar/>
    <div className="pt-5 pb-10">
      <div className="w-3/4 h-screen container m-auto grid grid-cols-6 grid-rows-3 p-10 gap-10 place-items-center">

        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 p-10">
          <div className="text-2xl h-1/2 text-white">Vocab</div>
          <div className="flex justify-end">
            <VocabLessonButton />
            <VocabReviewButton />
          </div>
        </div>

        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 p-10">
          <div className="text-2xl h-1/2 text-white">Kanji</div>
          <div className="flex justify-end">
            <KanjiLessonButton />
            <KanjiReviewButton />
          </div>
        </div>

        {/*Review forcast type thing here. take up two rows in the third colmn slot*/}
        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 row-span-1 text-white">
          <ReviewForecast />
        </div>

        <div className=" bg-white text-black w-full h-full rounded-lg p-5 mb-5 col-span-6 row-span-2">
          <WordCountGraph />
        </div>
      </div>
    </div>

    <Footer />

  </main>
)
}

