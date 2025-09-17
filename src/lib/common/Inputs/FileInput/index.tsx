import { PiCloudArrowUp, PiEye } from "react-icons/pi";
import { Input, Label, LabelError } from "../TextInput/style";
import { useState } from "react";

type IInputField = {
  url?: string;
  label?: string;
  error?: string;
  accept?: string;
  onChangeValue?: (file: File) => void;
};

const FileInput = (props: IInputField) => {
  const { url, label, onChangeValue } = props;
  const [file, setFile] = useState<File>();

  const onChangeFile = (ev: any) => {
    const file = ev.target.files[0];
    if (file) onChangeValue?.(file);
    setFile(file);
  };

  return (
    <Label>
      <b className="opacity-75 mb-1">{label}</b>
      <div
        className={`flex justify-between items-center gap-1 bg-white border rounded-md p-2 cursor-pointer
         hover:border-blue-500 text-gray-500`}
      >
        {url && !file && (
          <a
            href={url}
            target="_blank"
            className="flex items-center gap-2 text-blue-500"
          >
            <PiEye size={24} />
            <span>Ver Arquivo</span>
          </a>
        )}
        {file && (
          <div className="flex items-center gap-2 text-blue-500">
            <span>{file.name}</span>
          </div>
        )}
        {!url && !file && <span>Selecione um arquivo</span>}
        <PiCloudArrowUp size={24} />
      </div>
      <Input
        type="file"
        className="hidden"
        accept={props.accept}
        data-error={!!props.error}
        onChange={(ev: any) => onChangeFile(ev)}
      />
      <LabelError>{props.error}</LabelError>
    </Label>
  );
};

export default FileInput;
