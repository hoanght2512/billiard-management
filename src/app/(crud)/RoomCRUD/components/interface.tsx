export interface IBaseRoom {
  name: string;
  area: {
    id: string | number;
    // name: string
  };
}
export interface IRoom extends IBaseRoom {
  id: number | string;
}
export interface DataTypeRoom {
  id: string;
  name: string;
  area: {
    id: number | string;
    name: string;
  };
}
export interface DataTypeArea {
  id: string;
  name: string;
}
