import ExitButton from "@/components/ProtectedPageComps/ExitButton";
import ValidatingTextBox from "@/components/ProtectedPageComps/ValidatingTextBox";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function VocabReviews() {
    const supabase = createClient();
  
    //redirects to login page if not an authenticated/logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    //getting date
    let today = new Date().toISOString().slice(0, 10)

    //gets words that are due for review for the currently logged in user
    const { data, error } = await supabase.from('UserWords').select('words2ID').eq('userID', user.id).lte('reviewDate', today)

return(
  <main>
    <ExitButton />
    <p>{JSON.stringify(data)}</p>
    <ValidatingTextBox />
  </main>
)
}