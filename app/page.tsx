import Link from "next/link";
import { Game, GameType } from "./globalTypes";
import { MdLocationCity, MdOutlineForest } from "react-icons/md";
import css from "./page.module.scss";
import Image from "next/image";
import BackgroundImage from "./common/backgroundImage";
import city_vector from "../public/city_vector.svg";
import forest_vector from "../public/forest_vector.svg";

const gameList: Game[] = [
  {
    type: GameType.CITY,
    header: "Kaupungit",
    description:
      "Tiedätkö, mistä löytyy 20 asukasluvultaan suurinta kaupunkia?",
    link: "/cityQuiz",
    icon: <MdLocationCity className={css.icon} />,
    background_vector: city_vector,
  },
  {
    type: GameType.PROVINCE,
    header: "Maanosat",
    description: "Tiedätkö, missä on Suomen maakunnat?",
    link: "/provinceQuiz",
    icon: <MdOutlineForest className={css.icon} />,
    background_vector: forest_vector,
  },
];

export default function Home() {
  return (
    <div className={css.page}>
      <BackgroundImage source={"/background_index.png"} />
      <div className={css.subheader}>
        <h2>Kuinka hyvin tunnet Suomen?</h2>
      </div>
      <div className={css.game_list}>
        {gameList.map((game) => (
          <div key={game.type} className={css.game_list_item}>
            <Image
              className={css.item_image}
              src={game.background_vector}
              alt={"Background image"}
            />
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
        <span>Powered by: </span>
        <Link
          href={"https://www.amcharts.com/"}
          target="_blank"
          className={css.link_container}
        >
          <Image
            className={css.logo}
            src={"/amcharts_logo.png"}
            alt={"Amcharts Logo"}
            height={373}
            width={669}
          />
        </Link>
        <Link
          href={"https://www.kuviasuomesta.fi/"}
          target="_blank"
          className={css.link_container}
        >
          <Image
            className={css.logo}
            src={"/kuvia_suomesta_logo.png"}
            alt={"Kuvia Suomesta Logo"}
            height={167}
            width={1000}
          />
        </Link>
      </div>
    </div>
  );
}
