import { PiList, PiRecord, PiVideoCamera } from "react-icons/pi";

import { PiGlobe } from "react-icons/pi";
import { getLanguage } from "src/services/language";
import { MenuProps } from "antd";
import { Row } from "src/lib/common/Containers/Flex";

type MenuItem = Required<MenuProps>["items"][number];

export const navigationMenuItems: MenuItem[] = [
  {
    label: getLanguage()?.toUpperCase(),
    key: "language",
    icon: <PiGlobe size={20} />,
    style: { marginLeft: "auto" },
    children: [
      {
        label: "English",
        key: "en",
      },
      {
        label: "Português",
        key: "pt",
      },
    ],
  },
];

export const recordMenuItems: MenuItem[] = [
  {
    key: "1",
    label: (
      <Row>
        <PiVideoCamera size={22} />
        New Record
      </Row>
    ),
  },
  {
    key: "2",
    label: (
      <Row>
        <PiList size={22} />
        All Records
      </Row>
    ),
  },
];
