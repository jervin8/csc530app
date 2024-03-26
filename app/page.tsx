import Navbar from "@/components/Navbar";
import PrimarySection from "@/components/LandingPageComps/PrimarySection";
import SectionTitle from "@/components/LandingPageComps/SectionTitle";
import Testimonials from "@/components/LandingPageComps/Testimonials";
import Footer from "@/components/Footer";

export default function Landing() {

  return (
    <main className="h-full w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white">
      <Navbar />
      <PrimarySection />
      <SectionTitle pretitle="Space Repetition Benefits" title=" Why should you learn through space repitition">
        Space repetition is a learning technique that involves reviewing information at increasing intervals over time. 
        It offers several benefits for language learning:
        Improved Retention, Efficiency, Time Management, Long-Term Recall, and Adaptability
      </SectionTitle>
      {/*
      <SectionTitle pretitle="Watch a video" title="Learn how to fullfil your needs">
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don&apos;t forget to add one. Just like this.
      </SectionTitle>
      <Video />
      */}
      <SectionTitle pretitle="Don't just take our word for it" title="Here's what our customers said">
        These are a.i. generated
      </SectionTitle>
      <Testimonials />
      <Footer />
    </main>
  );
}
