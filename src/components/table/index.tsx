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
  Center,
  Spinner,
} from '@chakra-ui/react';

type TProps = {
  data: any;
  columns: any;
  isLoading?: boolean;
};

function Table({ data, columns, isLoading = false }: TProps) {
  const defaultData = data ?? [];

  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer width="100%">
      <TableUi variant="simple">
        <Thead>
          {table?.getHeaderGroups()?.map((headerGroup: any) => (
            <Tr key={headerGroup.id}>
              {headerGroup?.headers?.map((header: any) => (
                <Th key={header?.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column.columnDef.header,
                        header?.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows?.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells()?.map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              {columns && (
                <Td colSpan={columns.length}>
                  <Center>
                    {isLoading ? (
                      <Spinner size="md" marginY={8} />
                    ) : (
                      'No Record to Display'
                    )}
                  </Center>
                </Td>
              )}
            </Tr>
          )}
        </Tbody>
      </TableUi>
    </TableContainer>
  );
}

export default Table;
