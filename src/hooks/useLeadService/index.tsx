import { useCallback, useEffect, useState } from "react";
import { useToaster } from "react-hot-toast";
import { LEAD_STATUS } from "src/constants/enums/lead";
import { loadAlert, removeAlert, saveAlert } from "src/services/common/toast";
import {
  createLead,
  deleteLead,
  ILead,
  listLeads,
  updateLead,
} from "src/services/leads";

const useLeadService = () => {
  const [page, setPage] = useState(1);
  const [pSize, setPSize] = useState(10);
  const [pTotal, setPTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [queryDebounce, setQueryDebounce] = useState("");
  const [leadList, setLeadList] = useState<ILead[]>([]);
  const [leadStatus, setLeadStatus] = useState<string>(LEAD_STATUS.PENDING);
  const [leadScore, setLeadScore] = useState("");
  const loading = !!useToaster().toasts.length;

  const getLeads = useCallback(async () => {
    const leadFilters = {
      query: queryDebounce,
      status: leadStatus,
      score: leadScore,
    };
    const leadPage = {
      page: page,
      pageSize: pSize,
    };

    loadAlert(listLeads(leadFilters, leadPage)).then((res) => {
      const leadOptions = res.data.map((lead) => ({ ...lead, key: lead.id }));
      setLeadList(leadOptions);
      setPTotal(res.total);
    });
  }, [queryDebounce, leadStatus, leadScore, page, pSize]);

  const addLead = useCallback(async (lead: ILead) => {
    await saveAlert(createLead(lead));
  }, []);

  const editLead = useCallback(async (lead: ILead) => {
    await saveAlert(updateLead(lead));
  }, []);

  const removeLead = useCallback(async (lead: ILead) => {
    await removeAlert(deleteLead(lead));
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
    leadList,
    leadStatus,
    leadScore,
    setPage,
    setPSize,
    setPTotal,
    setQuery,
    getLeads,
    setLeadStatus,
    setLeadScore,
    changePage,
    addLead,
    editLead,
    removeLead,
  };
};

export default useLeadService;
