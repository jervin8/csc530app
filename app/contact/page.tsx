import Navbar from "@/components/Navbar";
import Contact from "@/components/LandingPageComps/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="bg-gray-200 dark:bg-slate-700 text-black dark:text-white min-h-screen w-full">
            <title>Contact Us</title>
            <Navbar />
            <Contact />
            <Footer />
        </main>
    )
}
