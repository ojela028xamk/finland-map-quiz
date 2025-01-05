export enum GameType {
  CITY = "City",
  PROVINCE = "Province",
}

export type Game = {
  type: GameType;
  description: string;
  link: string;
};
