export interface IWork {
  id: string;
  name: string;
  deadline: Date;
  isDone: boolean;
}

export interface ICategory {
  id: string;
  title: string;
  works: IWork[];
}
