import css from "./page.module.scss";
import RootMap from "./rootMap";

export default function Home() {
  return (
    <div className={css.page}>
      <RootMap />
    </div>
  );
}
