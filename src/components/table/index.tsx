import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

import {
  Table as TableUi,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

type TProps = {
  data: any;
  columns: any;
  isLoading?: boolean;
};

function Table({ data, columns, isLoading = false }: TProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer width="100%">
      <TableUi variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows?.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                colSpan={
                  columns.length === 1
                    ? columns[0].columns.length
                    : columns.length
                }
              >
                {isLoading
                  ? 'Load data from server...'
                  : 'No Record to Display'}
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableUi>
    </TableContainer>
  );
}

export default Table;