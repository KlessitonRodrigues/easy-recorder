import { Button } from "antd";
import { useEffect } from "react";
import { PiPen, PiTrash } from "react-icons/pi";
import { OpportunityStageOptions } from "src/constants/optionList";
import { opportunityTableCols } from "src/constants/tableItems";
import useOpportunityService from "src/hooks/useOpportunityService";
import { Column, Row } from "src/lib/common/Containers/Flex";
import SelectInput from "src/lib/common/Inputs/SelectInput";
import TextInput from "src/lib/common/Inputs/TextInput";
import CollapsibleTable from "src/lib/common/Tables/CollapsibleTable";
import Text, { getText } from "src/lib/common/Text/Text";
import { IOpportunity } from "src/services/opotunity";

type IOpportunityTable = {
  onEdit: (opportunity: IOpportunity) => void;
};

const OpportunityTable = (props: IOpportunityTable) => {
  const { onEdit } = props;
  const oppService = useOpportunityService();

  useEffect(() => {
    oppService.getOpportunities();
  }, [oppService.getOpportunities]);

  const ActionButtons = (opp: IOpportunity) => (
    <>
      <Button variant="solid" color="blue" onClick={() => onEdit(opp)}>
        <PiPen size={20} />
        <Text path="opportunity_action_edit" />
      </Button>
      <Button
        variant="solid"
        color="red"
        onClick={() => oppService.removeOpportunity(opp)}
      >
        <PiTrash size={20} />
        <Text path="opportunity_action_delete" />
      </Button>
    </>
  );

  return (
    <Column>
      <Row item="end" resposive="md">
        <TextInput
          label="Search"
          placeholder={getText("opportunity_search_placeholder")}
          value={oppService.query}
          onChangeValue={oppService.setQuery}
        />
        <SelectInput
          label="Stage"
          options={OpportunityStageOptions}
          value={oppService.stage}
          onChange={oppService.setStage}
        />
      </Row>
      <CollapsibleTable
        page={oppService.page}
        loading={oppService.loading}
        onPageChange={oppService.changePage}
        pageSize={oppService.pSize}
        pageTotal={oppService.pTotal}
        data={oppService.opportunityList}
        columns={opportunityTableCols}
        itemButtons={ActionButtons}
      />
    </Column>
  );
};

export default OpportunityTable;
