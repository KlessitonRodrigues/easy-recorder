import { PlusIcon, Trash2Icon } from "lucide-react";
import SelectInput from "../SelectInput";

type ISelectionInput = {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string | number) => void;
  options: { key: string | number; label: string }[];
  noEmpty?: boolean;
  viewOnly?: boolean;
};

const MultiSelectInput = (props: ISelectionInput) => {
  const { label, value, options, onChange } = props;
  const fieldMap = value ? String(value).split(";") : [];
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <SelectInput
          {...props}
          label={label}
          value={fieldMap[0] || ""}
          options={options}
          onChange={(val) => {
            const newFields = [val, ...fieldMap.slice(1)];
            onChange?.(newFields.join(";"));
          }}
        />
        <PlusIcon
          size={20}
          className="mt-6 hover:cursor-pointer"
          onClick={() => {
            const newFields = [...fieldMap, ""];
            onChange?.(newFields.join(";") || ";");
          }}
        />
      </div>
      {fieldMap.map((field, index) => {
        if (index === 0) return null;
        return (
          <div key={index} className="flex items-center gap-2">
            <SelectInput
              value={field}
              options={options}
              onChange={(val) => {
                const newFields = [...fieldMap];
                newFields[index] = String(val);
                onChange?.(newFields.join(";"));
              }}
            />
            <Trash2Icon
              size={20}
              className="hover:cursor-pointer"
              onClick={() => {
                const newFields = fieldMap.filter((_, i) => i !== index);
                onChange?.(newFields.join(";"));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectInput;
