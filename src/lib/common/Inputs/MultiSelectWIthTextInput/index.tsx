import { PlusIcon, Trash2Icon } from "lucide-react";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";

type IDataType = {
  key: string;
  label: string;
  value: string;
};

type IMultiSelectWithTextInput = {
  label?: string;
  value?: IDataType[];
  onChange?: (value: IDataType[]) => void;
  options: { key: string; label: string }[];
};

const MultiSelectWithTextInput = (props: IMultiSelectWithTextInput) => {
  const { label, value, onChange, options } = props;
  const defaultValue = value || [{ key: "", value: "", label: "" }];

  const onChangeOption = (index: number, newValue: string, label: string) => {
    const updatedValue = [...defaultValue];
    if (updatedValue[index]) {
      updatedValue[index].key = newValue || "";
      updatedValue[index].label = label || "";
    } else updatedValue.push({ key: newValue || "", label, value: "" });
    onChange?.(updatedValue);
  };

  const onChangeText = (index: number, newText: string) => {
    const updatedValue = [...defaultValue];
    if (updatedValue[index]) updatedValue[index].value = newText;
    else updatedValue.push({ key: "", label: "", value: newText });
    onChange?.(updatedValue);
  };

  const onAddNew = () => {
    const updatedValue = [...defaultValue, { key: "", label: "", value: "" }];
    onChange?.(updatedValue);
  };

  const onRemove = (index: number) => {
    const updatedValue = defaultValue.filter((_, idx) => idx !== index);
    onChange?.(updatedValue);
  };

  return (
    <div className="w-full flex flex-col">
      {label}
      <div className="w-full flex items-center gap-2">
        <SelectInput
          className="w-56"
          value={defaultValue[0]?.key || ""}
          options={options}
          onChange={(val, op) => {
            onChangeOption(0, String(val), op?.children || "");
          }}
        />
        <TextInput
          value={defaultValue[0]?.value || ""}
          onChangeValue={(val) => onChangeText(0, val)}
        />
        <PlusIcon className="w-10" onClick={onAddNew} />
      </div>
      {defaultValue?.slice(1)?.map((item, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <SelectInput
            className="w-56"
            value={item.key || ""}
            options={options}
            onChange={(val, op) => {
              onChangeOption(index + 1, String(val), op?.children || "");
            }}
          />
          <TextInput
            value={item.value}
            onChangeValue={(val) => onChangeText(index + 1, val)}
          />
          <Trash2Icon className="w-10" onClick={() => onRemove(index)} />
        </div>
      ))}
    </div>
  );
};

export default MultiSelectWithTextInput;
