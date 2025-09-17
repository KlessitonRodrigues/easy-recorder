import { LabelError, Input, Label } from "./style";

export type IInputField = {
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  input?: any;
  value?: string;
  type?: string;
  readOnly?: boolean;
  withDecimals?: boolean;
  onChangeValue?: (value: string) => void;
};

const TextInput = (props: IInputField) => {
  const { name, label, onChangeValue } = props;

  return (
    <Label>
      <b className="opacity-75">{label}</b>
      <Input
        type={props.type || "text"}
        id={name}
        name={name}
        placeholder={props.placeholder}
        autoComplete={name}
        value={props.value}
        readOnly={props.readOnly}
        data-error={!!props.error}
        data-type={props.type}
        onChange={(ev: any) => onChangeValue?.(ev.target?.value)}
        step={props.withDecimals ? ".1" : "1"}
        {...props.input}
      />
      <LabelError>{props.error}</LabelError>
    </Label>
  );
};

export default TextInput;
