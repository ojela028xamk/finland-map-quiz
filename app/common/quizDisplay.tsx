import {
  IoMdArrowDown,
  IoMdArrowForward,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { City, GameType, Province } from "../globalTypes";
import css from "./quizDisplay.module.scss";
import Image from "next/image";
import { translateProvinceName } from "../services/helperService";
import Link from "next/link";

type QuizDisplayProps = {
  gameType: GameType;
  isGameFinished: boolean;
  correctAnswerAmount: number;
  totalAnswerAmount: number;
  handleResetGame: () => void;
  currentItem: City | Province;
  currentItemImageUrl: string;
};

const QuizDisplay = ({
  gameType,
  isGameFinished,
  correctAnswerAmount,
  totalAnswerAmount,
  handleResetGame,
  currentItem,
  currentItemImageUrl,
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
              {gameType === GameType.CITY && (
                <span>
                  Karttaan voi zoomata
                  <IoMdInformationCircleOutline className={css.info} />
                </span>
              )}
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
                  src={currentItemImageUrl}
                  alt={"Coat of arms"}
                  fill
                  sizes="8vw"
                  quality={50}
                />
              </div>
              <span>
                {gameType === GameType.PROVINCE
                  ? translateProvinceName(currentItem as Province)
                  : currentItem}
              </span>
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
