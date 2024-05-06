import Navbar from "@/components/Navbar";
import PricingTable from "@/components/PricingTable";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'Pricing Table - Cruip Tutorials',
    description: 'Page description',
  }

export default function Pricing() {
    return (
        <main className="w-screen relative min-h-screen flex flex-col justify-center bg-gray-200 dark:bg-slate-700 text-black dark:text-white overflow-hidden">
            <Navbar />
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                <PricingTable />
            </div>
            <Footer />
        </main>
    )
}
