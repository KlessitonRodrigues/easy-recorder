import { LucideEye, LucideFileText } from "lucide-react";
import { Column, Row } from "../Flex";
import Link from "next/link";
import { Button } from "antd";

type IMultiFileView = {
  files?: { title: string; url: string }[];
};

const MultiFileView = (props: IMultiFileView) => {
  const { files } = props;
  return (
    <Column>
      {files?.map((file, index) => {
        if (!file.url) return null;
        return (
          <Row key={index} className="border p-2 rounded-md bg-white">
            <Row>
              <LucideFileText className="text-blue-600" />
              <p>{file.title}</p>
            </Row>
            <Row className="w-fit" item="center">
              <Link href={file.url} target="_blank">
                <Button variant="text" className="px-2">
                  <LucideEye size={22} className="text-blue-600" />
                </Button>
              </Link>
            </Row>
          </Row>
        );
      })}
    </Column>
  );
};

export default MultiFileView;
