"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getBdDate } from "@/lib/utils";
import { AddProductSellDialog } from "@/components/inventory/AddProductSellDialog";
import { AddProductDamageDialog } from "@/components/inventory/AddProductDamageDialog";
import { AddProductReturnDialog } from "@/components/inventory/AddProductReturnDialog";
import DeleteInventory from "@/components/inventory/DeleteInventory";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { InventoryItem } from "../store/page";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    id: "product_image",
    accessorKey: "product_image",
    header: () => <p className="text-center min-w-[80px]">Image</p>,
    cell: ({ row }) => {
      const { product_image, product_name } = row.original;

      return (
        <Image
          src={product_image}
          alt={product_name}
          width={100}
          height={100}
          priority
        />
      );
    },
  },
  {
    id: "product_name",
    accessorKey: "product_name",
    header: () => <p className="min-w-[180px]">Product</p>,
    cell: ({ row }) => {
      const { product_name } = row.original;

      return <p className=""> {product_name} </p>;
    },
  },
  {
    id: "store_name",
    header: () => <p className="text-center">Store Name</p>,
    cell: ({ row }) => {
      const { store } = row.original;

      return <p className="text-center"> {store.store_name} </p>;
    },
  },
  {
    id: "store_type",
    header: () => <p className="text-center">Store Type</p>,
    cell: ({ row }) => {
      const { store } = row.original;

      return <p className="text-center"> {store.store_type} </p>;
    },
  },
  {
    id: "total_allocation_quantity",
    accessorKey: "total_allocation_quantity",
    header: () => <p className="text-center">Total Allocation</p>,
    cell: ({ row }) => {
      const { total_allocation_quantity } = row.original;

      return <p className="text-center">{total_allocation_quantity}</p>;
    },
  },
  {
    id: "total_sell_quantity",
    accessorKey: "total_sell_quantity",
    header: () => <p className="text-center">Total Sell</p>,
    cell: ({ row }) => {
      const { total_sell_quantity } = row.original;

      return <p className="text-center">{total_sell_quantity}</p>;
    },
  },
  {
    id: "total_damage_quantity",
    accessorKey: "total_damage_quantity",
    header: () => <p className="text-center">Total Damage</p>,
    cell: ({ row }) => {
      const { total_damage_quantity } = row.original;

      return <p className="text-center">{total_damage_quantity}</p>;
    },
  },
  {
    id: "total_return_quantity",
    accessorKey: "total_return_quantity",
    header: () => <p className="text-center">Total Return</p>,
    cell: ({ row }) => {
      const { total_return_quantity } = row.original;

      return <p className="text-center">{total_return_quantity}</p>;
    },
  },
  {
    id: "available_quantity",
    accessorKey: "available_quantity",
    header: () => <p className="text-center">Stock</p>,
    cell: ({ row }) => {
      const { available_quantity } = row.original;

      return <p className="text-center">{available_quantity}</p>;
    },
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <p className="text-center min-w-[80px]">CreatedAt</p>,
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return (
        <p className="text-center">
          <time className="text-brand_primary">{getBdDate(createdAt)}</time>
        </p>
      );
    },
  },
  {
    id: "actions",
    // enableHiding: false,
    header: () => <p className="text-center">Action</p>,
    cell: ({ row }) => {
      const { id, store, product_id, product_name, available_quantity } =
        row.original;

      return (
        <div className=" h-full flex flex-col items-center gap-5">
          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <AddProductSellDialog
                heading="Product Sell"
                storeId={store.id}
                productId={product_id}
                inventoryId={id}
                availableQuantity={available_quantity}
              >
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="w-full flex gap-1 items-center"
                >
                  <span className="text-xs">sell</span>
                </Button>
              </AddProductSellDialog>
            </div>
            <div className="flex-1">
              <AddProductDamageDialog
                heading="Product Damage"
                storeId={store.id}
                productId={product_id}
                inventoryId={id}
                availableQuantity={available_quantity}
              >
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="w-full flex gap-1 items-center"
                >
                  <span className="text-xs">damage</span>
                </Button>
              </AddProductDamageDialog>
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <AddProductReturnDialog
                heading="Product Return"
                storeId={store.id}
                productId={product_id}
                productName={product_name}
                inventoryId={id}
                availableQuantity={available_quantity}
              >
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="w-full flex gap-1 items-center"
                >
                  <span className="text-xs">return</span>
                </Button>
              </AddProductReturnDialog>
            </div>
            <div className="flex-1">
              <DeleteInventory id={id}>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="w-full flex gap-1 items-center"
                >
                  <Trash2 size={20} className="text-red-500 cursor-pointer" />
                </Button>
              </DeleteInventory>
            </div>
          </div>
        </div>
      );
    },
  },
];

export function SingleStoreInventoryDataTable({
  data,
}: {
  data: InventoryItem[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search product..."
          value={
            (table.getColumn("product_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white">
        <ScrollArea className="w-full">
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
                              header.getContext()
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
                          cell.getContext()
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
