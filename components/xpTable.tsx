import React from "react";
import { DataTable } from "react-native-paper";

type TTableColumn<TItem extends object> = {
  key: string;
  label: string;
  render: (row: TItem) => React.ReactNode;
  props?: object;
};

type TTableProps<TItem extends object> = {
  columns: TTableColumn<TItem>[];
  items: TItem[];
  rowIdentifier: (row: TItem) => string | number;
};

export const XPTable = <TItem extends object>({
  columns,
  items,
  rowIdentifier,
}: TTableProps<TItem>) => {
  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((col) => (
          <DataTable.Title
            {...col.props}
            key={col.key}
            textStyle={{ color: "#fff" }}
          >
            {col.label}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {/* {items.slice(from, to).map((item) => ( */}
      {items.map((item) => (
        <DataTable.Row key={rowIdentifier(item)}>
          {columns.map((col) => (
            <DataTable.Cell {...col.props} key={col.key}>
              {col.render(item)}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}

      {/* <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      /> */}
    </DataTable>
  );
};
