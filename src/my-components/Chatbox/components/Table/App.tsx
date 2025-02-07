import { Input } from "@/components/ui/input";
import { JSX } from "react";
import TableTile from "./Tile/App";
import { TableTileInterface } from "@/types/Functions/TableTile";
import React from "react";

export default function Table(): JSX.Element {
  const data: TableTileInterface[] = [
    {
      index: 0,
      image: "test@123",
      price: 100,
      itemName: "Ooty Orange",
      availableQty: 10.5,
      unit: "Kg",
      sellerName: "Amazon",
      freshness: "Fresh",
      date: "25/04/24",
      selectedQty: 0,
      city: "Erode"
    }
  ]

  const [sampleData, setSampleData] = React.useState<TableTileInterface[]>(data);


  function updateVal(index: number, val: number): void {
    setSampleData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, selectedQty: Math.max(0, item.selectedQty + val) }
          : item
      )
    );
  }

  return (
    <>
      <div className="rounded-lg borde xl:max-w-[70%] border dark:shadow-lg dark:shadow-gray-900/90 shadow-md">
        <div className="m-2 border p-2 rounded-lg" >
          <Input placeholder="Filter the items" className="rounded-lg" />
        </div>
        <div className="flex flex-col p-2 space-y-5">
          {sampleData.map((ele) => (
            <TableTile data={ele} updateValueFunc={updateVal} />
          ))}
        </div >
      </div>
    </>
  );
}
