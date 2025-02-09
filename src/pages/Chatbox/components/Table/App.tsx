import { Input } from "@/components/ui/input";
import { JSX, useEffect } from "react";
import TableTile from "./Tile/App";
import React from "react";
import { Product } from "@/types/Product/Product";

export default function Table({
  product,
}: {
  product: Array<any>;
}): JSX.Element {
  const [allData, setAllData] = React.useState<Product[]>([]);
  const [data, setData] = React.useState<Product[]>([]);
  const [filterByName, setFilterByName] = React.useState<string>("");

  useEffect(() => {
    const productArray: Product[] = [];
    product.map((ele, val) => {
      productArray.push({
        ...ele,
        selectedQty: 0,
        index: val,
      });
    });
    setAllData(productArray);
    setData(productArray);
  }, [product]);

  function updateVal(index: number, val: number): void {
    setAllData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, selectedQty: Math.max(0, item.selectedQty + val) }
          : item,
      ),
    );
  }

  useEffect(() => {
    if (filterByName.trim() == "") {
      setData(allData);
      return;
    }
    const newArray: Product[] = allData.filter((ele) =>
      ele.name.toLowerCase().includes(filterByName.toLowerCase()),
    );
    setData(newArray);
  }, [filterByName, allData]);

  return (
    <>
      <div className="rounded-lg max-w-[75%] border dark:shadow-lg dark:shadow-gray-900/90 shadow-md p-2">
        <div className="m-2 border p-2 rounded-lg">
          <Input
            onChange={(data) => setFilterByName(data.target.value)}
            value={filterByName}
            placeholder="Filter the items"
            className="rounded-lg"
          />
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 sm:max-h-[50vh] overflow-y-auto max-h-[80vh]">
          {data.map((ele, key) => (
            <TableTile data={ele} key={key} updateValueFunc={updateVal} />
          ))}
        </div>
      </div>
    </>
  );
}
