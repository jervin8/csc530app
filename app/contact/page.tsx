import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <main className="bg-white h-full w-screen">
            <title>Contact Us</title>
            <Navbar />

            <div className="text-center">
              <h1 className="text-3xl font-bold m-4 text-black">Contact Us</h1>
              <p className="text-lg text-gray-600 mb-8">
                Submit the form below if you have problems with your payment, want
                to request a feature, make a partnership proposal or report a bug.
                We're more than happy to help.
              </p>
            </div>
            <form className="max-w-lg mx-auto mb-5">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-600 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </form>

            <Footer />

        </main>
    )
}
