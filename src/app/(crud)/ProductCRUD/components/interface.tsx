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