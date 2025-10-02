import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const usePageChanger = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return {
    page,
  };
};
