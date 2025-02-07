import { Button } from "@/components/ui/button";
import { TableTileInterface } from "@/types/Functions/TableTile";
import { Calendar, MapPin, Minus, Plus, ShoppingCart, Store, Weight } from "lucide-react";
import { JSX } from "react";

export default function TableTile({ data, updateValueFunc }: { data: TableTileInterface, updateValueFunc: (index: number, val: number) => void }): JSX.Element {
  return (
    <div className="flex flex-wrap md:flex-nowrap w-full border rounded-md h-auto md:h-[20vh] p-2">
      {/* Image Container */}
      <div className="h-32 md:h-full bg-black w-full md:w-1/3 rounded-md md:rounded-l-md ml-2"></div>

      {/* Details */}
      <div className="flex flex-col justify-between ml-2 w-full space-y-1">
        <div className="text-xl md:text-3xl font-roboto font-semibold">
          {data.itemName}
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
          {data.sellerName}
        </div>

        {/* Location */}
        <div className="flex items-center gap-x-2 text-sm">
          <MapPin size={16} />
          {data.city}
        </div>

        {/* Date */}
        <div className="flex items-center gap-x-2 text-sm">
          <Calendar size={16} />
          {data.date}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-x-2 text-sm">
          <Weight size={16} />
          {data.availableQty} {data.unit}
        </div>
      </div>
      <div className="sm:flex sm:flex-col-reverse flex flex-row gap-2">
        <Button>Buy Now</Button>
        <Button><ShoppingCart /></Button>
      </div>
    </div>
  );
}
