import { Input } from "@/components/ui/input";
import { JSX, useEffect } from "react";
import TableTile from "./Tile/App";
import React from "react";
import { Product } from "@/types/Product/Product";
import { LoginType } from "@/types/User";

export default function Table({
  product,
  type,
}: {
  product: Array<any>;
  type: LoginType;
}): JSX.Element {
  const [allData, setAllData] = React.useState<Product[]>([]);
  const [data, setData] = React.useState<Product[]>([]);
  const [filterByName, setFilterByName] = React.useState<string>("");

  useEffect(() => {
    const productArray: Product[] = [];
    product.map((ele) => {
      productArray.push({
        ...ele,
      });
    });
    setAllData(productArray);
    setData(productArray);
  }, [product]);

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
      <div className="rounded-lg max-w-[75%] border dark:shadow-lg dark:shadow-gray-900/90 shadow-md p-2 my-4">
        <div className="m-2 border p-2 rounded-lg">
          <Input
            onChange={(data) => setFilterByName(data.target.value)}
            value={filterByName}
            placeholder="Filter the items"
            className="rounded-lg"
          />
        </div>
        {data.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center">
            No items found
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 sm:max-h-[50vh] overflow-y-auto max-h-[70vh] p-2">
            {data.map((ele, key) => (
              <TableTile data={ele} key={key} type={type} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
