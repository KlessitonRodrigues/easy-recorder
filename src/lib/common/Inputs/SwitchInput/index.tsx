import { Switch } from "antd";
import { Row } from "../Flex";
import { Text } from "../Text";
import { Label, LabelError } from "../TextInput/style";

type ISwitchInput = {
  label?: string;
  error?: string;
  checked?: boolean;
  onChange?: () => void;
};

const SwitchInput = (props: ISwitchInput) => {
  const { label, checked, onChange } = props;
  return (
    <Label>
      <Row>
        <Text className="min-w-56">{label}</Text>
        <Switch checked={checked} onChange={() => onChange?.()} />
      </Row>
      <LabelError>{props.error}</LabelError>
    </Label>
  );
};

export default SwitchInput;
