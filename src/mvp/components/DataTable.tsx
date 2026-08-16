import React from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  /** Hide this column on small screens to keep tables readable on mobile. */
  hideOnMobile?: boolean;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  empty?: string;
}

/** Horizontally scrollable, mobile-friendly table for the clinical MVP. */
function DataTable<T>({ columns, rows, rowKey, caption, empty = 'Nothing to show yet.' }: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center text-[11px] text-muted-foreground">{empty}</div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="no-scrollbar overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="border-b border-border bg-clinical-surface">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground',
                    c.hideOnMobile && 'hidden sm:table-cell',
                    c.className
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn('px-3 py-2.5 align-middle text-[11px] text-foreground', c.hideOnMobile && 'hidden sm:table-cell', c.className)}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
