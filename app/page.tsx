import Link from "next/link";
import { Game, GameType } from "./globalTypes";
import { MdLocationCity, MdOutlineForest } from "react-icons/md";
import css from "./page.module.scss";

const gameList: Game[] = [
  {
    type: GameType.CITY,
    header: "Kaupungit",
    description:
      "Tiedätkö, mistä löytyy 20 asukasluvultaan suurinta kaupunkia?",
    link: "/cityQuiz",
    icon: <MdLocationCity className={css.icon} />,
  },
  {
    type: GameType.PROVINCE,
    header: "Maanosat",
    description: "Tiedätkö, missä on Suomen maakunnat?",
    link: "/provinceQuiz",
    icon: <MdOutlineForest className={css.icon} />,
  },
];

export default function Home() {
  return (
    <div className={css.page}>
      <div className={css.header}>
        <h1>SUOMEN MAANTIETOVISA</h1>
      </div>
      <div className={css.subheader}>
        <h2>Kuinka hyvin tunnet Suomen?</h2>
      </div>
      <div className={css.game_list}>
        {gameList.map((game) => (
          <div key={game.type} className={css.game_list_item}>
            <div className={css.item_header}>
              <span>{game.header}</span> {game.icon}
            </div>
            <div className={css.item_content}>
              <p>{game.description}</p>
            </div>
            <div className={css.item_button}>
              <Link href={game.link}>
                <button>Avaa peli</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={css.footer}>
        <h1>Powered by: AmCharts 5</h1>
      </div>
    </div>
  );
}
