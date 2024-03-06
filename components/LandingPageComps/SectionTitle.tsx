import React, { ReactNode } from "react";
import Container from "@/components/LandingPageComps/Container";

interface SectionTitleProps {
  align?: "left" | "center";
  pretitle?: string;
  title?: string;
  children?: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  align = "center",
  pretitle,
  title,
  children,
}) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        align === "left" ? "" : "items-center justify-center text-center"
      }`}
    >
      {pretitle && (
        <div className="text-lg font-bold tracking-wider text-indigo-700 dark:text-indigo-500 uppercase">
          {pretitle}
        </div>
      )}

      {title && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          {title}
        </h2>
      )}

      {children && (
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {children}
        </p>
      )}
    </Container>
  );
};

export default SectionTitle;
