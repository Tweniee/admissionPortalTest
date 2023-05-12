export interface State {
  StateID: number;
  StateName: string;
}

export interface City {
  CityID: number;
  Name: string;
  StateID: number;
}

export interface User {
  userName: string;
  password: string;
  role: string;
}

export interface Data {
  States: State[];
  Cities: City[];
  users: User[];
}
