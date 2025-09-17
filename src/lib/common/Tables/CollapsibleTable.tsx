import React, { useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PiCaretDown, PiCaretRight } from "react-icons/pi";

type ICollapsibleTableProps = {
  data?: any[];
  loading?: boolean;
  columns?: ColumnsType<any>;
  pageSize?: number;
  pageTotal?: number;
  page?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  itemButtons?: (item: any) => React.ReactNode;
};

const CollapsibleTable = (props: ICollapsibleTableProps) => {
  const {
    data,
    columns,
    loading,
    page,
    pageSize,
    pageTotal,
    onPageChange,
    itemButtons,
  } = props;
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  return (
    <Table<any>
      bordered
      size="small"
      className="w-full"
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={{
        pageSize,
        current: page,
        total: pageTotal,
        onChange: onPageChange,
      }}
      rowHoverable
      expandable={{
        expandedRowRender: (record) => {
          const hiddenCols = columns?.filter((col) => col.hidden);
          return (
            <div>
              <div className="divide-y">
                {hiddenCols?.map((col: any) => (
                  <div
                    key={col.key}
                    className="flex gap-1 border-gray-300 py-2"
                  >
                    <span className="opacity-50">{String(col.title)}:</span>
                    <span>{record[col.dataIndex]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col lg:flex-row gap-2 py-2">
                {itemButtons ? itemButtons(record) : null}
              </div>
            </div>
          );
        },
        expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [record.key] : []);
        },
        expandIcon: ({ expanded, onExpand, record }) => (
          <Button type="link" onClick={(e) => onExpand(record, e)}>
            {expanded ? <PiCaretDown size={18} /> : <PiCaretRight size={18} />}
          </Button>
        ),
      }}
      rowKey="key"
    />
  );
};

export default CollapsibleTable;
