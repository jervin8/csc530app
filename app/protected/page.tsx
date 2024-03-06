import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import KanjiReviewButton from "@/components/ProtectedPageComps/KanjiReviewButton";
import VocabReviewButton from "@/components/ProtectedPageComps/VocabReviewButton";
import VocabLessonButton from "@/components/ProtectedPageComps/VocabLessonButton";
import KanjiLessonButton from "@/components/ProtectedPageComps/KanjiLessonButton";


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
  <main className="w-full">
    <Navbar/>
    <div className="h-screen pt-20">
        <div className="container h-full mx-auto  text-gray-900 dark:text-white">

            <h1>Vocab</h1>
            <VocabLessonButton />
            <VocabReviewButton />
            <h1>Kanji</h1>
            <KanjiLessonButton />
            <KanjiReviewButton />
        </div>
    </div>
    <Footer />
  </main>
)
}

