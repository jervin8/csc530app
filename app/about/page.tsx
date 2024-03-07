import Navbar from "@/components/Navbar";
import Image from 'next/image';
import AboutBackground from "@/app/public/img/about_background.png";
import SectionTitle from "@/components/LandingPageComps/SectionTitle";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="h-full w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white">
        <Navbar />
        <div className="h-screen">
          <div>
              <Image src={AboutBackground} alt="About Us" layout="responsive"/>
          </div>

          <div className="relative">
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
    </main>
  );
}
