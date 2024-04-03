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
    <div className="pt-20">
      <div className="w-3/4 h-full container m-auto grid grid-cols-6 grid-rows-4 gap-10 place-items-center">
        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 p-5">
          <h1>Vocab</h1>
          <VocabLessonButton />
          <VocabReviewButton />
        </div>
        
        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 p-5">
          <h1>Kanji</h1>
          <KanjiLessonButton />
          <KanjiReviewButton />
        </div>

        <div className="w-full h-full rounded-lg bg-indigo-600 col-span-2 row-span-3">
          {/*Review forcast type thing here. take up two rows in the thrid colmn slot*/}
          <ReviewForecast />
        </div>

        <div className=" bg-white text-black w-full h-full rounded-lg p-5 col-span-4 row-span-2">
          <WordCountGraph />
        </div>

        <div className="w-full h-full m-auto grid grid-cols-5 col-span-6 place-items-center">
          <div className="w-3/4 h-3/4 rounded-lg bg-indigo-600 p-5">
            Rookie
          </div>
          <div className="w-3/4 h-3/4 rounded-lg bg-indigo-600 p-5">
            Amateur
          </div>
          <div className="w-3/4 h-3/4 rounded-lg bg-indigo-600 p-5">
            Expert
          </div>
          <div className="w-3/4 h-3/4 rounded-lg bg-indigo-600 p-5">
            Master
          </div >
          <div className="w-3/4 h-3/4 rounded-lg bg-indigo-600 p-5">
            Gigachad
          </div>
        </div>
      </div>

      
    <Footer />
    </div>
  </main>
)
}

