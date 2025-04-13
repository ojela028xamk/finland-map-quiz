import {
  IoMdArrowDown,
  IoMdArrowForward,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { City } from "../globalTypes";
import css from "./quizDisplay.module.scss";
import Image from "next/image";
import { getCityCoatOfArms } from "../services/helperService";
import Link from "next/link";

type QuizDisplayProps = {
  isGameFinished: boolean;
  correctAnswerAmount: number;
  totalAnswerAmount: number;
  handleResetGame: () => void;
  currentCity: City;
};

const QuizDisplay = ({
  isGameFinished,
  correctAnswerAmount,
  totalAnswerAmount,
  handleResetGame,
  currentCity,
}: QuizDisplayProps) => {
  return (
    <div className={css.quiz_display}>
      <div className={css.display_score}>
        {isGameFinished ? (
          <>
            <div className={css.header}>
              <span>Peli päättyi</span>
            </div>
            <div className={css.content}>
              <span>
                Pistemäärä: {correctAnswerAmount} / {totalAnswerAmount}
              </span>
              <button onClick={handleResetGame}>Pelaa uudestaan</button>
            </div>
          </>
        ) : (
          <>
            <div className={css.header}>
              <span>
                Karttaan voi zoomata
                <IoMdInformationCircleOutline className={css.info} />
              </span>
              <span>
                Valitse kartalta
                <IoMdArrowForward className={css.arrow_forward} />
                <IoMdArrowDown className={css.arrow_down} />
              </span>
            </div>
            <div className={css.content}>
              <div className={css.image_container}>
                <Image
                  className={css.image}
                  src={getCityCoatOfArms(currentCity)}
                  alt={"Coat of arms"}
                  width={100}
                  height={100}
                  quality={50}
                />
              </div>
              <span>{currentCity}</span>
            </div>
          </>
        )}
      </div>
      <div className={css.display_nav}>
        <Link href={"/"}>
          <button>Valitse toinen peli</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizDisplay;
