export type Location = {
  _id: string;
  city: string;
  state: string;
};

export type UserAddress = {
  _id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
};
