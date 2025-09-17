import { Select } from "antd";
import { Label, LabelError } from "../TextInput/style";
import { twMerge } from "tailwind-merge";

type ISelectionInput = {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string, op: any) => void;
  options: { key: string; label: string }[];
  noEmpty?: boolean;
  viewOnly?: boolean;
};

const SelectInput = (props: ISelectionInput) => {
  const {
    label,
    error,
    className,
    value,
    noEmpty,
    viewOnly,
    onChange,
    options,
  } = props;
  return (
    <Label>
      <b className="opacity-75">{label}</b>
      <Select
        allowClear={!noEmpty}
        className={twMerge(
          `w-full min-h-10 mt-1 border-none ${className || ""}`
        )}
        placeholder="Selecionar uma opção"
        value={value || undefined}
        onChange={(value, op) => onChange?.(value, op)}
        disabled={viewOnly}
      >
        {options.map((option) => (
          <Select.Option key={option.key} value={option.key}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <LabelError>{error}</LabelError>
    </Label>
  );
};

export default SelectInput;
