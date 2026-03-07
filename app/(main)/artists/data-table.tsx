'use client'

import * as React from 'react'
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
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: { pageSize: 10 },
      sorting: [],
    },
  })

  // Helper to safely access columns
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="w-full space-y-4">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
          {/* 1. SEARCH: Artist Name */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter artists..."
              value={
                (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('fullName')?.setFilterValue(event.target.value)
              }
              className="pl-8 h-8 w-full sm:w-[250px]"
            />
          </div>

          {/* 2. FILTER: Status (Verified/Pending) */}
          {table.getColumn('status') && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-dashed"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Verification</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn('status')?.getFilterValue() === 'verified'
                  }
                  onCheckedChange={(checked) =>
                    table
                      .getColumn('status')
                      ?.setFilterValue(checked ? 'verified' : undefined)
                  }
                >
                  Verified
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn('status')?.getFilterValue() === 'pending'
                  }
                  onCheckedChange={(checked) =>
                    table
                      .getColumn('status')
                      ?.setFilterValue(checked ? 'pending' : undefined)
                  }
                >
                  Pending
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* 3. FILTER: Artist Type */}
          {table.getColumn('artistType') && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-dashed"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Artist Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* You can make this list dynamic by extracting unique values from `data` if you prefer */}
                {[
                  'Singer',
                  'Band',
                  'DJ',
                  'Instrumentalist',
                  'Magician',
                  'Comedian',
                ].map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={(
                      table
                        .getColumn('artistType')
                        ?.getFilterValue() as string[]
                    )?.includes(type)}
                    onCheckedChange={(checked) => {
                      const column = table.getColumn('artistType')
                      const filterValue =
                        (column?.getFilterValue() as string[]) || []

                      if (checked) {
                        column?.setFilterValue([...filterValue, type])
                      } else {
                        column?.setFilterValue(
                          filterValue.filter((val) => val !== type),
                        )
                      }
                    }}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* RESET BUTTON */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
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
  )
}
