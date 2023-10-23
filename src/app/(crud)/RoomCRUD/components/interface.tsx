export interface IBaseRoom {
    name: string;
    area: {
        id: string | number,
        // name: string
    };
  }
  export interface IRoom extends IBaseRoom {
    id: number | string;
  }
  