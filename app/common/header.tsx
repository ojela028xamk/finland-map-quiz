"use client";
import { usePathname } from "next/navigation";
import css from "./header.module.scss";

const Header = () => {
  const currentPath = usePathname();

  const currentGame = () => {
    switch (currentPath) {
      case "/cityQuiz":
        return "(Kaupungit)";
      case "/provinceQuiz":
        return "(Maakunnat)";
      default:
        return "";
    }
  };

  return (
    <div className={currentPath === "/" ? css.header_main : css.header_page}>
      <h1>SUOMEN MAANTIETOVISA {currentGame()}</h1>
    </div>
  );
};

export default Header;
