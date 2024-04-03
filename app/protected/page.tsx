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
        <div className="h-screen container mx-auto">
            <h1>Vocab</h1>
            <VocabLessonButton />
            <VocabReviewButton />
            <h1>Kanji</h1>
            <KanjiLessonButton />
            <KanjiReviewButton />
            <div className=" bg-white text-black w-1/2 rounded-lg p-5">
            <WordCountGraph />
            </div>
        </div>
       
    <Footer />
    </div>
  </main>
)
}

