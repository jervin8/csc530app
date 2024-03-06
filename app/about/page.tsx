import Navbar from "@/components/Navbar";
import Image from 'next/image';
import AboutBackground from "@/app/public/img/about_background.png";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="h-full w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white">
        <Navbar />
        <div className="h-screen">
          <div>
              <Image src={AboutBackground} alt="About Us" width={500} height={300}/>
          </div>

          <div className="relative">
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                suscipit ligula et metus tincidunt, ut interdum nisi congue.
                Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas.
              </p>
          </div>
        </div>
        <Footer/>
    </main>
  );
}
