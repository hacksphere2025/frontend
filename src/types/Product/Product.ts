import { Category } from "./Category";
import { Seller } from "./Seller";
import { Location } from "./Location";

export type Product = {
  _id: string;
  category: Category;
  name: string;
  sold_qty: number;
  quantity: number;
  unit: string;
  price: number;
  image: string;
  seller_id: Seller;
  freshness: number;
  harvest_date: Date;
  location: Location;
};
