import { useEffect, useState } from "react";
import { PiCloudArrowUp, PiFile, PiX } from "react-icons/pi";

type IMultiFileInput = {
  maxFiles?: number;
  onChange?: (files: File[]) => void;
};

const MultiFileInput = (props: IMultiFileInput) => {
  const { maxFiles, onChange } = props;
  const [files, setFiles] = useState<File[]>([]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files || [])[0];
    if (file) setFiles((prevFiles) => [...prevFiles, file]);
  };

  const onFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onChange?.(files);
  }, [files, onChange]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-1">
        {files.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between border p-1 rounded-md"
          >
            <div className="flex items-center gap-2">
              <PiFile className="text-blue-500" />
              {file.name}
              <span className="text-sm text-gray-500">
                {Math.round(file.size / 1024)} KB
              </span>
            </div>
            <PiX
              size={20}
              className="text-red-600 cursor-pointer"
              onClick={() => onFileRemove(i)}
            />
          </div>
        ))}
      </div>
      {files.length < (maxFiles || Infinity) && (
        <label className="flex justify-center gap-2 border p-2 mt-2 rounded-md hover:border-blue-500 cursor-pointer">
          <PiCloudArrowUp size={24} className="text-blue-500" />
          <p>Adicionar Arquivos</p>
          <input
            type="file"
            className="opacity-0 w-0 h-0"
            accept="application/pdf"
            onChange={onFileChange}
            disabled={maxFiles ? files.length >= maxFiles : false}
          />
        </label>
      )}
    </div>
  );
};

export default MultiFileInput;
