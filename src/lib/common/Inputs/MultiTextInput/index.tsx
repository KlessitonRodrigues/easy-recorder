import { PlusIcon, Trash2Icon } from "lucide-react";
import TextInput, { IInputField } from "../TextInput";

const MultiTextInput = (props: IInputField) => {
  const { label, value, onChangeValue } = props;
  const fieldMap = value ? value.split(";") : [];
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <TextInput
          {...props}
          value={fieldMap[0] || ""}
          onChangeValue={(val) => {
            const newFields = [val, ...fieldMap.slice(1)];
            onChangeValue?.(newFields.join(";"));
          }}
        />
        <PlusIcon
          size={20}
          className="mt-6 hover:cursor-pointer"
          onClick={() => {
            const newFields = [...fieldMap, ""];
            onChangeValue?.(newFields.join(";") || ";");
          }}
        />
      </div>
      {fieldMap.map((field, index) => {
        if (index === 0) return null;
        return (
          <div key={index} className="flex items-center gap-2">
            <TextInput
              value={field}
              onChangeValue={(val) => {
                const newFields = [...fieldMap];
                newFields[index] = val;
                onChangeValue?.(newFields.join(";"));
              }}
              placeholder={`${label} ${index + 1}`}
            />
            <Trash2Icon
              size={20}
              className="hover:cursor-pointer"
              onClick={() => {
                const newFields = fieldMap.filter((_, i) => i !== index);
                onChangeValue?.(newFields.join(";"));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultiTextInput;
