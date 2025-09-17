import { useCallback, useEffect, useState } from "react";
import { useToaster } from "react-hot-toast";
import { loadAlert, removeAlert, saveAlert } from "src/services/common/toast";
import {
  createOpportunity,
  deleteOpportunity,
  IOpportunity,
  listOpportunities,
  updateOpportunity,
} from "src/services/opotunity";

const useOpportunityService = () => {
  const [page, setPage] = useState(1);
  const [pSize, setPSize] = useState(10);
  const [pTotal, setPTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [queryDebounce, setQueryDebounce] = useState("");
  const [opportunityList, setOpportunityList] = useState<IOpportunity[]>([]);
  const [stage, setStage] = useState<string | undefined>(undefined);
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
  const loading = !!useToaster().toasts.length;

  const getOpportunities = useCallback(async () => {
    const filters = {
      query: queryDebounce,
      stage,
      minAmount,
      maxAmount,
    };
    const pageObj = {
      page: page,
      pageSize: pSize,
    };

    loadAlert(listOpportunities(filters, pageObj)).then((res) => {
      const options = res.data.map((opp) => ({ ...opp, key: opp.id }));
      setOpportunityList(options);
      setPTotal(res.total);
    });
  }, [queryDebounce, stage, minAmount, maxAmount, page, pSize]);

  const addOpportunity = useCallback(async (opportunity: IOpportunity) => {
    await saveAlert(createOpportunity(opportunity));
  }, []);

  const editOpportunity = useCallback(async (opportunity: IOpportunity) => {
    await saveAlert(updateOpportunity(opportunity));
  }, []);

  const removeOpportunity = useCallback(async (opportunity: IOpportunity) => {
    await removeAlert(deleteOpportunity(opportunity));
  }, []);

  const changePage = useCallback(
    (p: number, ps: number) => {
      setPage(p);
      setPSize(ps);
    },
    [page, pSize]
  );

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
    opportunityList,
    stage,
    minAmount,
    maxAmount,
    setPage,
    setPSize,
    setPTotal,
    setQuery,
    getOpportunities,
    setStage,
    setMinAmount,
    setMaxAmount,
    changePage,
    addOpportunity,
    editOpportunity,
    removeOpportunity,
  };
};

export default useOpportunityService;
