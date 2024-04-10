import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfilePage from "@/components/ProtectedPageComps/profile";

export default async function Dashboard() {
  const supabase = createClient();

  //redirects to login page if not an authenticated/logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


return (
  <main className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
    <Navbar/>

    <div className="pt-20">    
         <ProfilePage/>
         </div>
    <Footer />
  </main>
)
}

