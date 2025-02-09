import { api } from "@/api/App";
import { useUser } from "@/provider/userProvider/App";
import { Order } from "@/types/Order";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { JSX, useEffect } from "react";
import { columns } from "./Columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Order(): JSX.Element {
  const { user } = useUser();
  const [data, setData] = React.useState<Order[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/order/buy");
      if (response.status == 200) {
        const orderData: Order[] = [];
        response.data.data.map((ele, val: number) =>
          orderData.push({
            product: {
              index: val,
              selectedQty: 0,
              ...ele.product_id,
            },
            id: ele._id,
            quantity: ele.quantity,
          }),
        );
        setData(orderData);
      }
    };
    getData();
  }, [user]);

  return (
    <>
      <div className="flex flex-col">
        <div className="text-3xl font-bold">Your Orders</div>
        <div className="text-xl text-muted-foreground">
          Hello, {user?.userName}
        </div>
        <div className="mr-2 mt-2">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
