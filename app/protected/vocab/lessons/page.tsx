import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import TextBoxCORRECT from "@/components/ProtectedPageComps/TextBoxCORRECT";
import TextBoxWRONG from "@/components/ProtectedPageComps/TextBoxWRONG";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function VocabLessons() {
    const supabase = createClient();
  
    //redirects to login page if not an authenticated/logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

return(
  <main className="w-full">
    <ExitButton />
    <TextBoxCORRECT />
    <TextBoxWRONG />
  </main>
)
}