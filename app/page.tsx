import CityQuiz from "./cityQuiz/page";
import css from "./page.module.scss";
import ProvinceQuiz from "./provinceQuiz/page";

export default function Home() {
  return (
    <div className={css.page}>
      <CityQuiz />
      <ProvinceQuiz />
    </div>
  );
}
