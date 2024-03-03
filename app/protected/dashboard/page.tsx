import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import KanjiButton from "@/components/ProtectedPageComps/KanjiButton";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import VocabButton from "@/components/ProtectedPageComps/VocabButton";


export default async function Dashboard() {
  const supabase = createClient();

  //redirects to login page if not an authenticated/logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: Users } = await supabase.from("Users").select();

return (
  <main className="w-full">
    <Navbar/>
    <div className="h-screen pt-20">
        <div className="container h-full mx-auto text-white">
            <VocabButton />
            <KanjiButton />
        </div>
    </div>
    <Footer />
  </main>
)
}

