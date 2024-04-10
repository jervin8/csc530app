import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import DictionaryPage from "../../../components/ProtectedPageComps/Dictionary";


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
  <main className="w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <Navbar/>
    <div className="h-screen pt-20">
        <div className="container h-full mx-auto  text-gray-900 dark:text-white">
           <DictionaryPage/>
        </div>
    <Footer />
    </div>
  </main>
)
}

