import { Menu, MenuProps } from "antd";
import { Row } from "src/lib/common/Containers/Flex";

import { useLocation } from "react-router-dom";
import { setLanguage } from "src/services/language";
import { navigationMenuItems } from "src/constants/menuItems";
import Title from "src/lib/common/Text/Title";
import { PiVideoCamera } from "react-icons/pi";
import Text from "src/lib/common/Text/Text";

const Header = () => {
  const location = useLocation();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "en") setLanguage("en");
    else if (key === "pt") setLanguage("pt");
  };

  return (
    <Row className="bg-white">
      <Row className="p-4">
        <PiVideoCamera size={28} />
        <Title tag="h3">
          <Text path="header_title" />
        </Title>
      </Row>
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[location.pathname]}
        items={navigationMenuItems}
        style={{ fontSize: "1.05rem", padding: "0.5rem 1rem" }}
      />
    </Row>
  );
};

export default Header;
