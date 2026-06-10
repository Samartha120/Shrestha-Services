import React from "react";
import Skeleton from "./Skeleton";

interface Column<T> {
  key: keyof T;
  header: string;

  render?: (
    value: any,
    row: T
  ) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];

  loading?: boolean;

  emptyMessage?: string;
}

export default function Table<
  T extends Record<string, any>
>({
  data,
  columns,
  loading,
  emptyMessage =
    "No data found",
}: TableProps<T>) {

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="
            h-12
            w-full
            "
          />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div
        className="
        rounded-2xl
        border
        border-dashed
        p-8
        text-center
        text-slate-500
        "
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      "
    >
      <div className="overflow-x-auto">
        <table
          className="
          min-w-full
          divide-y
          divide-slate-200
          "
        >
          <thead
            className="
            bg-slate-50
            "
          >
            <tr>
              {columns.map(
                (column) => (
                  <th
                    key={
                      String(
                        column.key
                      )
                    }
                    className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    "
                  >
                    {
                      column.header
                    }
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody
            className="
            divide-y
            divide-slate-100
            bg-white
            "
          >
            {data.map(
              (
                row,
                rowIndex
              ) => (
                <tr
                  key={rowIndex}
                  className="
                  transition-colors
                  hover:bg-slate-50
                  "
                >
                  {columns.map(
                    (
                      column
                    ) => (
                      <td
                        key={String(
                          column.key
                        )}
                        className="
                        px-6
                        py-4
                        text-sm
                        "
                      >
                        {column.render
                          ? column.render(
                              row[
                                column
                                  .key
                              ],
                              row
                            )
                          : String(
                              row[
                                column
                                  .key
                              ]
                            )}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}