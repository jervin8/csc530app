import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <main className="bg-gray-200 dark:bg-slate-700 text-black dark:text-white min-h-screen w-full">
            <title>Contact Us</title>
            <Navbar />
            <div className="min-h-screen">
                <div className="text-center">
                <h1 className="text-3xl font-bold m-4">Contact Us</h1>
                <p className="text-lg mb-8">
                    Submit the form below if you have problems with payment, <br/> want to report a bug, or any other acocunt services.<br/>
                    We're more than happy to help.
                </p>
                </div>
                <form className="max-w-lg mx-auto mb-5">
                <div className="mb-6">
                    <label htmlFor="name" className="block font-semibold mb-2">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
                    placeholder="Your Name"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block font-semibold mb-2">
                    Email Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
                    placeholder="Your Email"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="blockfont-semibold mb-2">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
                    placeholder="Your Message"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-300"
                >
                    Submit
                </button>
                </form>
            </div>

            <Footer />

        </main>
    )
}
