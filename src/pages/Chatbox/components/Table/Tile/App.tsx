import { Button } from "@/components/ui/button";
import { convertToStandardWeight } from "@/my-components/Weight/App";
import { useUser } from "@/provider/userProvider/App";
import { Product } from "@/types/Product/Product";
import {
  Calendar,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  Weight,
} from "lucide-react";
import { JSX } from "react";

export default function TableTile({ data }: { data: Product }): JSX.Element {
  const { setCart, cart, removeElementCart } = useUser();

  return (
    <div className="flex flex-col border rounded-md h-auto p-2">
      {/* Image Container */}
      <div className=""></div>

      {/* Details */}
      <div className="flex flex-col justify-between ml-2 w-full space-y-1">
        <div className="text-xl md:text-3xl font-roboto font-semibold">
          {data.name}
        </div>

        {/* Price */}
        <div className="text-lg md:text-2xl font-bold">₹{data.price}</div>

        {/* Freshness Indicator */}
        <div className="flex items-center gap-2">
          <div className="bg-green-500 rounded-full h-4 w-4"></div>
          <div className="text-sm">{data.freshness}</div>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-x-2 text-sm">
          <Store size={16} />
          {data.seller_id.name}
        </div>

        {/* Location */}
        <div className="flex items-center gap-x-2 text-sm">
          <MapPin size={16} />
          {data.location.city}
        </div>

        {/* Date */}
        <div className="flex items-center gap-x-2 text-sm">
          <Calendar size={16} />
          {data.harvest_date}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-x-2 text-sm">
          <Weight size={16} />
          {data.quantity} {data.unit}
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between p-2">
        {cart.get(data._id) == null || cart.get(data._id)?.quantity == 0 ? (
          <Button
            onClick={() => {
              setCart(data._id, {
                product: data,
                quantity: 100,
              });
            }}
          >
            <ShoppingCart />
          </Button>
        ) : (
          <div className="flex flex-row items-center justify-around">
            <button
              onClick={() => {
                const value = cart.get(data._id)!.quantity;
                if (value - 100 <= 0) {
                  removeElementCart(data._id);
                  return;
                }
                setCart(data._id, {
                  product: data,
                  quantity: value - 100,
                });
              }}
            >
              <Minus />
            </button>
            {convertToStandardWeight(cart.get(data._id)!.quantity)}
            <button
              onClick={() => {
                const value = cart.get(data._id)!.quantity;
                setCart(data._id, {
                  product: data,
                  quantity: value + 100,
                });
              }}
            >
              <Plus />
            </button>
          </div>
        )}
        <Button>Buy Now</Button>
      </div>
    </div>
  );
}
