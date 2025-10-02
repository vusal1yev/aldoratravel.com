"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./Table.module.scss";

const Table = ({
  tableRow,
  dataCount = 0,
  paginationCount = 10,
  noPagination,
  children,
}: {
  tableRow: Array<{ name: string }>;
  dataCount?: number;
  paginationCount?: number;
  noPagination?: boolean;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(useSearchParams().get("page") || "1");

  const totalPage =
    Math.floor(dataCount / paginationCount) +
    Math.ceil((dataCount % paginationCount) / paginationCount);

  const pageChanger = (page: number) => {
    if (page > 0 && page <= totalPage) router.push(`${pathname}?page=${page}`);
  };

  return (
    <div className={styles.table}>
      <div className={styles.table__box}>
        <table>
          <thead>
            <tr>
              {tableRow.map((row, index) => (
                <th key={`table_row_${row.name}_${index}`}>{row.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>

      {!noPagination && totalPage > 1 && (
        <div className={styles.table__pagination}>
          <button
            className={styles.nav__button}
            onClick={() => pageChanger(Number(currentPage) - 1)}
            disabled={currentPage === 1}
          >
            <span>Previous</span>
          </button>

          <div className={styles.numbers}>
            {Array.from({ length: totalPage }, (_, i) => {
              if (
                i === 0 ||
                i === totalPage - 1 ||
                i === currentPage - 1 ||
                i === currentPage ||
                i === currentPage + 1
              ) {
                return (
                  <button
                    className={`${currentPage === i + 1 && styles.active}`}
                    key={i}
                    onClick={() => pageChanger(i + 1)}
                  >
                    <span>{i + 1}</span>
                  </button>
                );
              }
              return null;
            })}
          </div>

          <button
            className={styles.nav__button}
            onClick={() => pageChanger(Number(currentPage) + 1)}
            disabled={currentPage === totalPage}
          >
            <span>Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
