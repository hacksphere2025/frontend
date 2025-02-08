import { Input } from "@/components/ui/input";
import { JSX, useEffect } from "react";
import TableTile from "./Tile/App";
import { Product } from "@/types/Functions/TableTile";
import React from "react";

export default function Table({
  product,
}: {
  product: Array<any>;
}): JSX.Element {
  const [data, setData] = React.useState<Product[]>([]);

  useEffect(() => {
    const productArray: Product[] = [];
    product.map((ele, val) => {
      productArray.push({
        ...ele,
        selectedQty: 0,
        index: val,
      });
    });
    setData(productArray);
  }, [product]);

  function updateVal(index: number, val: number): void {
    setData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, selectedQty: Math.max(0, item.selectedQty + val) }
          : item,
      ),
    );
  }

  return (
    <>
      <div className="rounded-lg sm:max-w-[40%] border dark:shadow-lg dark:shadow-gray-900/90 shadow-md">
        <div className="m-2 border p-2 rounded-lg">
          <Input placeholder="Filter the items" className="rounded-lg" />
        </div>
        <div className="flex flex-col p-2 space-y-5">
          {data.map((ele, key) => (
            <TableTile data={ele} key={key} updateValueFunc={updateVal} />
          ))}
        </div>
      </div>
    </>
  );
}
