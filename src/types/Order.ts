import { Product } from "./Product/Product";

export type Order = {
  id: string;
  product: Product;
  quantity: number;
};
