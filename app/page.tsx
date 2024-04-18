import Navbar from "@/components/Navbar";
import PrimarySection from "@/components/LandingPageComps/PrimarySection";
import SectionTitle from "@/components/LandingPageComps/SectionTitle";
import Testimonials from "@/components/LandingPageComps/Testimonials";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function Landing() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();



  

  return (
    <main className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
      <Navbar />
      <PrimarySection />
      <SectionTitle pretitle="Space Repetition Benefits" title=" Why should you learn through space repitition">
        Space repetition is a learning technique that involves reviewing information at increasing intervals over time.
        It offers several benefits for language learning:
        Improved Retention, Efficiency, Time Management, Long-Term Recall, and Adaptability
      </SectionTitle>
      <SectionTitle pretitle="Don't just take our word for it" title="Here's what our customers said">
        These are a.i. generated
      </SectionTitle>
      <Testimonials />
      <Footer />
    </main>
  );
}
