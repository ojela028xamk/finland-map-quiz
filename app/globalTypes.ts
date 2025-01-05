export enum GameType {
  CITY = "City",
  PROVINCE = "Province",
}

export type Game = {
  type: GameType;
  header: string;
  description: string;
  link: string;
};
