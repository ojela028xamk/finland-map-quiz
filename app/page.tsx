import Link from "next/link";
import { Game, GameType } from "./globalTypes";
import css from "./page.module.scss";

const gameList: Game[] = [
  {
    type: GameType.CITY,
    header: "20 largest cities",
    description: "20 largest cities based on population.",
    link: "/cityQuiz",
  },
  {
    type: GameType.PROVINCE,
    header: "Finnish provinces",
    description: "Finnish provinces.",
    link: "/provinceQuiz",
  },
];

export default function Home() {
  return (
    <div className={css.page}>
      <div className={css.header}>
        <h1>Finnish Map Quiz</h1>
        <h2>Do you know finnish geography?</h2>
      </div>
      <div className={css.game_list}>
        {gameList.map((game) => (
          <div className={css.game_list_item}>
            <h1>{game.header}</h1>
            <p>{game.description}</p>
            <Link href={game.link}>
              <button>Open game</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
