import { Calendar, MapPin, Minus, Plus, Store } from "lucide-react";
import { JSX } from "react";

export default function TableTile({
  image,
  itemName,
  weight,
  sellerName,
  freshness,
  date,
  location: city
}: {
  image: string, itemName: string, weight: string, sellerName: string, freshness: string, date: string, location: string
}): JSX.Element {
  return (
    <div className="border flex flex-row p-2 rounded-lg items-center justify-evenly drop-shadow shadow-gray-50/15">
      <div className="h-full bg-green-100">
        {image}
      </div>
      <div className="flex flex-col justify-evenly">
        <div className="text-4xl font-bold">
          {itemName}
        </div>
        <div className="text-sm ml-1">
          {weight}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 border rounded-md space-x-4 p-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-start">
            <Store className="h-3 w-3" />
            <div className="font-thin text-sm ml-1">{sellerName}</div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <div className="rounded-full h-3 w-3 bg-green-500">
            </div>
            <div className="font-thin text-sm ml-1">
              {freshness}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-start">
            <Calendar className="w-4 h-4" />
            <div className="text-sm ml-1">{date}</div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <MapPin className="w-4 h-4" />
            <div className="text-sm ml-1">{city}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-10">
        <Minus className="hover:bg-white hover:text-black rounded-md" />
        <div>1.1</div>
        <Plus className="hover:bg-white hover:text-black rounded-md" />
      </div>
    </div>
  );
}
