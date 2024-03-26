
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/LandingPageComps/SectionTitle";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
        <Navbar />
        <div className="h-screen">
          <div className="bg-slate-800 text-white py-8">
              <h1 className="text-center text-7xl font-bold">About Us</h1>
          </div>

          <div className="">
            <SectionTitle pretitle="" title="Making learning Japanese Simple">
              <div className="text-2xl text-black dark:text-white">
                We are dedicated to revolutionizing the way you learn Japanese. 
                Our innovative approach combines the power of spatial repetition learning with a focus on both grammar and vocabulary. 
                By harnessing cutting-edge technology and expert linguistic insights, we provide a comprehensive and immersive learning
                experience that accelerates your Japanese language proficiency. Whether you're a beginner or an advanced learner, 
                our tailored programs ensure that you master Japanese grammar and vocabulary effectively and efficiently. 
                Join us on your journey to fluency and unlock new opportunities in the vibrant world of Japanese language and culture.
              </div>
            </SectionTitle>
          </div>
          
        </div>
        <Footer/>
    </div>
  );
}
