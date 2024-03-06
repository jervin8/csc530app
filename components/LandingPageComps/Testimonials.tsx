import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import Container from "@/components/LandingPageComps/Container";

import userOneImg from "@/app/public/img/user1.jpg";
import userTwoImg from "@/app/public/img/user2.jpg";
import userThreeImg from "@/app/public/img/user3.jpg";

interface AvatarProps {
  image: StaticImageData;
  name: string;
  title: string;
}

interface MarkProps {
  children: ReactNode;
}

const Testimonials: React.FC = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 rounded-3xl bg-gray-100 dark:bg-slate-800 text-black dark:text-white">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full px-14 py-14">
            <p className="text-2xl leading-normal ">
            This app transformed my language learning journey! With spaced repetition, I <Mark>effortlessly</Mark> remembered words and phrases, making fluency achievable.
            </p>

            <Avatar
              image={userOneImg}
              name="Sarah Steiner"
              title="Future Japanese Resident"
            />

          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              With <Mark>spaced repetition</Mark>, I no longer fear forgetting new words. It's like having a personal language tutor in my pocket!
            </p>

            <Avatar
              image={userTwoImg}
              name="Dylan Ambrose"
              title="Self-learner"
            />

          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full px-14 rounded-2xl py-14 ">
            <p className="text-2xl leading-normal ">
            The spaced repetition feature helped me overcome the plateau in my language learning journey. Now, I'm more confident in my <Mark>writing</Mark> and <Mark>comprehension</Mark> skills.
            </p>

            <Avatar
              image={userThreeImg}
              name="Gabrielle Winn"
              title="Japan Resident"
            />

          </div>
        </div>
      </div>
    </Container>
  );
};

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width={40}
          height={40}
          alt="Avatar"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
};

const Mark: React.FC<MarkProps> = (props) => {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
};

export default Testimonials;
