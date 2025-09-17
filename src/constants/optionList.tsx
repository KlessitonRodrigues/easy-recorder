import { getText } from "src/lib/common/Text/Text";
import { LEAD_STATUS, OPPORTUNITY_STAGE } from "./enums/lead";

export const LeadStatusOptions = [
  { label: getText("lead_status_pending"), key: LEAD_STATUS.PENDING },
  { label: getText("lead_status_approved"), key: LEAD_STATUS.APPROVED },
  { label: getText("lead_status_rejected"), key: LEAD_STATUS.REJECTED },
];

export const LeadScoreOptions = [
  { label: getText("lead_score_low"), key: "low" },
  { label: getText("lead_score_high"), key: "high" },
];

export const OpportunityStageOptions = [
  {
    label: getText("opportunity_stage_pending"),
    key: OPPORTUNITY_STAGE.PENDING,
  },
  {
    label: getText("opportunity_stage_approved"),
    key: OPPORTUNITY_STAGE.APPROVED,
  },
  {
    label: getText("opportunity_stage_rejected"),
    key: OPPORTUNITY_STAGE.REJECTED,
  },
];
