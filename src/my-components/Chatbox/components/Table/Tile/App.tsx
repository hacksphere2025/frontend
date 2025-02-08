import { Button } from "@/components/ui/button";
import { Product } from "@/types/Functions/TableTile";
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

export default function TableTile({
  data,
  updateValueFunc,
}: {
  data: Product;
  updateValueFunc: (index: number, val: number) => void;
}): JSX.Element {
  const parsedDate = Date.parse(data.harvest_date);
  console.log(parsedDate.toLocaleString)
  return (
    <div className="flex flex-wrap md:flex-nowrap border rounded-md h-auto p-2">
      {/* Image Container */}
      <div className="h-full md:h-full bg-black md:w-1/3 rounded-md md:rounded-l-md ml-2"></div>

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
      <div className="flex flex-row w-full sm:flex sm:flex-col-reverse sm:w-min items-center justify-start gap-2 ">
        <Button>Buy Now</Button>
        {data.selectedQty == 0 ? (
          <Button
            onClick={() => {
              updateValueFunc(data.index, 0.1);
            }}
          >
            <ShoppingCart />
          </Button>
        ) : (
          <div className="flex flex-row items-center justify-around w-full">
            <button
              onClick={() => {
                updateValueFunc(data.index, -0.05);
              }}
            >
              <Minus />
            </button>
            {data.selectedQty.toPrecision(3)}
            <button
              onClick={() => {
                updateValueFunc(data.index, 0.05);
              }}
            >
              <Plus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
