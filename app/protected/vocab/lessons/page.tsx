import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
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

    //gets wordids that are due for review for the currently logged in user
    const { data: userwordids, error } = await supabase.from('UserWords').select('words2ID').eq('userID', user.id)
    console.log(userwordids);

    const { data: newwordsid, error } = await supabase.from('UserWords').select('words2ID').eq('userID', user.id)


return(
  <main className="w-full">
    <ExitButton />
    
  </main>
)
}