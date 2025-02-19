export enum MessageCategory {
  add_prod,
  list_prod_prod,
  update_list_prod,
  list_cons,
  list_all_seller,
  place_order_for_user,
  none,
}

export interface ChatDataType {
  message: string;
  user: MessageUserType;
  type: MessageCategory;
  data?: any;
}

enum MessageUserType {
  user,
  bot,
}
