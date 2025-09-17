import { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import { themeConfig } from "src/style/antDesignTheme";

const AppProviders = (props: PropsWithChildren) => {
  const { children } = props;

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};

export default AppProviders;
