import Image from "next/image";
import Container from "@/components/LandingPageComps/Container";

const PrimarySection = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            Japanese is complex. <br/>
            We make it simple.
            </h1>
            <p className="py-5 text-2xl leading-normal text-gray-500 lg:text-2xl xl:text-4xl dark:text-gray-300">
              2,000 kanji. <br/>
              6,000 vocabulary words.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="/about"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Learn More
              </a>
              <a
                href="/contact"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              width={616}
              height={617}
              className={"object-cover"}
              alt="PrimarySection Illustration"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default PrimarySection;
