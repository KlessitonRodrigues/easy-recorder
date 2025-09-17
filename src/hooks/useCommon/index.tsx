import { useEffect, useState } from "react";

const useCommon = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pSize, setPSize] = useState(10);
  const [pTotal, setPTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [queryDebounce, setQueryDebounce] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setQueryDebounce(query), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return {
    loading,
    page,
    pSize,
    pTotal,
    query,
    queryDebounce,
    setLoading,
    setPage,
    setPSize,
    setPTotal,
    setQuery,
  };
};

export default useCommon;
