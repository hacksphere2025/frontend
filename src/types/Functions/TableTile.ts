export type Category = {
  _id: string;
  name: string;
};

export type Seller = {
  _id: string;
  name: string;
  email: string;
};

export type Location = {
  _id: string;
  city: string;
  state: string;
};

export type Product = {
  _id: string;
  index: number;
  category: Category;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  image: string;
  seller_id: Seller;
  freshness: number;
  harvest_date: string;
  location: Location;
  selectedQty: number;
};
