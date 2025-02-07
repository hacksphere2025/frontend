import { Input } from "@/components/ui/input";
import { JSX } from "react";
import TableTile from "./Tile/App";

export default function Table(): JSX.Element {
  return (
    <>
      <div className="rounded-lg borde xl:max-w-[40%] border dark:shadow-lg dark:shadow-gray-900/90 shadow-md">
        <div className="m-2 border p-2 rounded-lg" >
          <Input placeholder="Filter the items" className="rounded-lg" />
        </div>
        <div className="flex flex-col p-2">
          <TableTile image="sample" itemName="Carrot" weight="10.5 kg"
            sellerName="Amazon" freshness="Fresh" date="25/04/24" location="Erode" />
        </div >
      </div>
    </>
  );
}
