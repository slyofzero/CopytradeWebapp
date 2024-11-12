import React, { HTMLAttributeAnchorTarget } from "react";
import { Link } from "../Common";
import { classNames } from "@/utils";
import { saira } from "@/pages/_app";
import { ConnectButton } from "../blockchain";

interface ButtonData {
  text: string;
  link: string;
  target?: HTMLAttributeAnchorTarget;
}

interface Props {
  children: React.ReactNode;
  className?: string;
}

const buttons: ButtonData[] = [
  { link: "/", text: "Home" },
  { link: "#", text: "Link 1" },
  { link: "#", text: "Link 2" },
  { link: "#", text: "Link 3" },
];

export function MainLayout({ children, className }: Props) {
  const navButtons = (
    <>
      {buttons.map(({ link, text }, key) => (
        <Link
          key={key}
          className="bg-black text-white p-2 rounded-lg w-fit text-center lg:w-32"
          href={link}
        >
          {text}
        </Link>
      ))}
    </>
  );

  return (
    <main
      className={classNames(
        "min-h-screen w-screen px-4 lg:px-16 flex flex-col bg-black",
        saira.className,
        className || ""
      )}
    >
      <header className="flex justify-between pt-8">
        <Link href={"/"}>
          {/* <Image src={"/banner.png"} alt="banner" className="w-32 lg:w-48" /> */}
        </Link>

        <nav className="mx-auto hidden lg:flex items-center gap-0">
          {navButtons}
        </nav>

        <div className="flex flex-col lg:flex-row items-center gap-4">
          <ConnectButton />
        </div>
      </header>

      <nav className="flex lg:hidden justify-between items-center gap-0">
        {navButtons}
      </nav>

      {children}
    </main>
  );
}
