export interface IBaseProduct {
  name: string;
  image: string;
  price: number;
  category: {
    id: string | number;
    // name: string
  };
  unit: {
    id: string | number;
    // name: string
  };
}

export interface IProduct extends IBaseProduct{
  id: number | string;
}

export interface DataTypeProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: {
    id: number | string;
    name: string;
  };
  unit: {
    id: number | string;
    name: string;
  };
}

export interface DataTypeCategory {
  id: string;
  name: string;
}

export interface DataTypeUnit {
  id: string;
  name: string;
}
