export interface IArea {
    id: number;
    name: string;
  }
  export interface AreaDetail {
    name: string;
  }
  //
  export interface ICategory {
    id: number
    name: string
  }
  export interface CategoryDetail {
    name: string
  }
  //
  export interface IUnit {
    id: number
    name: string
  }
  export interface UnitDetail {
    name: string
  }

  //
  export interface IProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    productCategory: DataTypeCategory;
    productUnit: DataTypeUnit;
  }
  export interface DataTypeCategory {
    id: string;
    name: string;
  }
  
  export interface DataTypeUnit extends DataTypeCategory {};
  
  export interface ProductDetail {
    name: string;
    image: string;
    price: number;
    productCategory: Pick<DataTypeCategory, 'id'>;
    productUnit: Pick<DataTypeUnit, 'id'>;
  }
  //
  export interface IRoom {
    id: number;
    name: string;
    area: DataTypeArea;
  }
  export interface DataTypeArea {
    id: string;
    name: string;
  }
  export interface RoomDetail {
    name: string;
    area: Pick<DataTypeArea, 'id'>;
  }
  //