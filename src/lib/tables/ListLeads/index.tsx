import { Button } from "antd";
import { useEffect } from "react";
import { PiCheck, PiPen, PiTrash, PiX } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LeadScoreOptions, LeadStatusOptions } from "src/constants/optionList";
import { leadTableItems } from "src/constants/tableItems";
import useLeadService from "src/hooks/useLeadService";
import { Column, Row } from "src/lib/common/Containers/Flex";
import SelectInput from "src/lib/common/Inputs/SelectInput";
import TextInput from "src/lib/common/Inputs/TextInput";
import CollapsibleTable from "src/lib/common/Tables/CollapsibleTable";
import Text, { getText } from "src/lib/common/Text/Text";
import { removeAlert, saveAlert } from "src/services/common/toast";
import {
  convertToOpportunity,
  deleteLead,
  ILead,
  rejectLead,
} from "src/services/leads";

type ILeadsTableProps = {
  onEdit?: (lead: ILead) => void;
};

const LeadsTable = (props: ILeadsTableProps) => {
  const { onEdit } = props;
  const leadService = useLeadService();
  const navigate = useNavigate();

  const onConvertLead = async (lead: ILead) => {
    await saveAlert(convertToOpportunity(lead));
    navigate(`/opportunities`);
  };

  const onRejectLead = async (lead: ILead) => {
    await saveAlert(rejectLead(lead));
    leadService.getLeads();
  };

  const onDeleteLead = async (lead: ILead) => {
    await removeAlert(deleteLead(lead));
    leadService.getLeads();
  };

  useEffect(() => {
    leadService.getLeads();
  }, [leadService.getLeads, onEdit]);

  const ActionButtons = (lead: ILead) => (
    <>
      <Button variant="solid" color="blue" onClick={() => onEdit?.(lead)}>
        <PiPen size={20} />
        <Text path="lead_action_edit" />
      </Button>
      <Button variant="solid" color="green" onClick={() => onConvertLead(lead)}>
        <PiCheck size={20} />
        <Text path="lead_action_make_opportunity" />
      </Button>
      <Button variant="solid" color="yellow" onClick={() => onRejectLead(lead)}>
        <PiX size={20} />
        <Text path="lead_action_refuse" />
      </Button>
      <Button variant="solid" color="red" onClick={() => onDeleteLead(lead)}>
        <PiTrash size={20} />
        <Text path="lead_action_delete" />
      </Button>
    </>
  );

  return (
    <Column>
      <Row item="end" resposive="md">
        <TextInput
          label="Search"
          placeholder={getText("lead_search_placeholder")}
          value={leadService.query}
          onChangeValue={(value) => leadService.setQuery(value)}
        />
        <Row>
          <SelectInput
            label="Status"
            options={LeadStatusOptions}
            value={leadService.leadStatus}
            onChange={(value) => leadService.setLeadStatus(value)}
          />
          <SelectInput
            label="Score"
            options={LeadScoreOptions}
            value={leadService.leadScore}
            onChange={(value) => leadService.setLeadScore(value)}
          />
        </Row>
      </Row>
      <CollapsibleTable
        data={leadService.leadList}
        loading={leadService.loading}
        columns={leadTableItems}
        page={leadService.page}
        pageSize={leadService.pSize}
        pageTotal={leadService.pTotal}
        itemButtons={ActionButtons}
        onPageChange={leadService.changePage}
      />
    </Column>
  );
};

export default LeadsTable;
