import Link from "next/link";
import { Game, GameType } from "./globalTypes";
import css from "./page.module.scss";

const gameList: Game[] = [
  {
    type: GameType.CITY,
    description: "20 largest cities.",
    link: "/cityQuiz",
  },
  {
    type: GameType.PROVINCE,
    description: "Finnish provinces.",
    link: "/provinceQuiz",
  },
];

export default function Home() {
  return (
    <div className={css.page}>
      <div className={css.game_list}>
        {gameList.map((game) => (
          <div className={css.game_list_item}>
            <h1>{game.type}</h1>
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
