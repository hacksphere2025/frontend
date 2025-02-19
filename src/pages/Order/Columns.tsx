"use client";

import { Order } from "@/types/Order";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "product.name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "product.freshness",
    header: "Freshness",
  },
  {
    accessorKey: "product.harvest_date",
    header: "Harvest Date"
  },
  {
    accessorKey: "product.price",
    header: "Price",
  },
];
