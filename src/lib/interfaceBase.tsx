export interface IArea {
  id: number;
  name: string;
}
export interface AreaDetail {
  name: string;
}
//
export interface ICategory {
  id: number;
  name: string;
}
export interface CategoryDetail {
  name: string;
}
//
export interface IUnit {
  id: number;
  name: string;
}
export interface UnitDetail {
  name: string;
}

//
export interface IProduct {
  id: number;
  name: string;
  hourly: boolean;
  image: string;
  price: number;
  productCategory: DataTypeCategory;
  productUnit: DataTypeUnit;
}
export interface DataTypeCategory {
  id: string;
  name: string;
}

export interface DataTypeUnit extends DataTypeCategory {}

export interface ProductDetail {
  name: string;
  image: string;
  price: number;
  productCategory: Pick<DataTypeCategory, "id">;
  productUnit: Pick<DataTypeUnit, "id">;
}
//
export interface IRoom {
  id: number;
  name: string;
  area: DataTypeArea;
  status: boolean;
}
export interface DataTypeArea {
  id: string;
  name: string;
}
export interface RoomDetail {
  name: string;
  area: Pick<DataTypeArea, "id">;
  status: boolean;
}
//
export interface LoginDetail {
  username: string;
  password: string;
}
//
export interface ICustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  discount: number;
}
export interface CustomerDetail {
  name: string;
  email: string;
  phone: string;
  discount: number;
}
//
export interface IRole extends IArea {}
export interface IUser {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  roles: IRole[];
}

export interface UserDetail {
  username: string;
  password: string;
  fullname: string;
  email: string;
  roles: IRole[];
}
//s
export interface IRoomOrder {
  id: number;
  room: IRoom;
  product: IProduct;
  // orderTime: string;
  quantity: number;
  // price: number;
  created_at: Date;
}
export interface RoomOrderDetail {
  room: Pick<IRoom, "id">;
  product: Pick<IProduct, "id">;
  // orderTime: string;
  quantity: any;
  // price: number;
  created_at: any;
}
//
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
    status: boolean;
  }
  export interface DataTypeArea {
    id: string;
    name: string;
  }
  export interface RoomDetail {
    name: string;
    area: Pick<DataTypeArea, 'id'>;
    status: boolean;
  }
  //
  export interface LoginDetail{
    username: string;
    password: string;
  }
  //
  export interface ICustomer {
    id: number
    name: string
    email: string
    phone: string
    discount: number
  }
  export interface CustomerDetail {
    name: string
    email: string
    phone: string
    discount: number
  }
  //
  export interface IRole extends IArea{}
  export interface IUser {
    id: number
    username: string
    password: string
    fullname: string
    email: string
    roles: IRole[]
  }

  export interface UserDetail {
    username: string
    password: string
    fullname: string
    email: string
    roles: IRole[]
  }
