import Link from "next/link";
import { Game, GameType } from "./globalTypes";
import css from "./page.module.scss";

const gameList: Game[] = [
  {
    type: GameType.CITY,
    header: "20 Largest Cities",
    description: "20 largest cities based on population.",
    link: "/cityQuiz",
  },
  {
    type: GameType.PROVINCE,
    header: "Finnish Provinces",
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
          <div key={game.type} className={css.game_list_item}>
            <span>{game.header}</span>
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
