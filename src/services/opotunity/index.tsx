import { readStorage, saveStorage } from "../common/localStorage";
import { sleep } from "src/utils/async";

export type IOpportunity = {
  id?: string;
  name?: string;
  stage?: string;
  amount?: number;
  accountName?: string;
};

type IOpportunityFilters = {
  query?: string;
  stage?: string;
  minAmount?: number;
  maxAmount?: number;
};

type IOpportunityPage = {
  page?: number;
  pageSize?: number;
};

const STORAGE_KEY = "opportunities";

const getOpportunities = (): IOpportunity[] => {
  return JSON.parse(readStorage(STORAGE_KEY) || "[]") || [];
};

const saveOpportunities = (opportunities: IOpportunity[]) => {
  saveStorage(STORAGE_KEY, JSON.stringify(opportunities || []));
};

const getOpportunity = async (id: string) => {
  await sleep(1000);
  return getOpportunities().find((opp) => opp.id === id);
};

const listOpportunities = async (
  filters: IOpportunityFilters,
  page: IOpportunityPage
) => {
  await sleep(1000);
  let opportunities = getOpportunities();

  if (filters.query) {
    const q = filters.query.toLowerCase();
    opportunities = opportunities.filter(
      (opp) =>
        opp?.name?.toLowerCase().includes(q) ||
        opp?.accountName?.toLowerCase().includes(q)
    );
  }

  if (filters.stage) {
    opportunities = opportunities.filter((opp) => opp.stage === filters.stage);
  }

  if (filters.minAmount !== undefined) {
    opportunities = opportunities.filter(
      (opp) => (opp.amount ?? 0) >= filters.minAmount!
    );
  }

  if (filters.maxAmount !== undefined) {
    opportunities = opportunities.filter(
      (opp) => (opp.amount ?? 0) <= filters.maxAmount!
    );
  }

  const pageNum = page.page ?? 1;
  const pageSize = page.pageSize ?? 10;
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  const pagedOpportunities = opportunities.slice(start, end);

  return {
    data: pagedOpportunities,
    total: opportunities.length,
    page: pageNum,
    pageSize,
    totalPages: Math.ceil(opportunities.length / pageSize),
  };
};

const createOpportunity = async (opportunity: IOpportunity) => {
  await sleep(1000);
  const opportunities = getOpportunities();
  opportunity.id = Date.now().toString();
  opportunities.push(opportunity);
  saveOpportunities(opportunities);
  return opportunity;
};

const updateOpportunity = async (updated: IOpportunity) => {
  await sleep(1000);
  const opportunities = getOpportunities();
  const idx = opportunities.findIndex((opp) => opp.id === updated.id);
  if (idx !== -1) {
    opportunities[idx] = updated;
    saveOpportunities(opportunities);
  }
};

const deleteOpportunity = async (opp: IOpportunity) => {
  await sleep(1000);
  const opportunities = getOpportunities().filter(
    (dbOpp) => dbOpp.id !== opp.id
  );
  saveOpportunities(opportunities);
};

export {
  getOpportunity,
  listOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
