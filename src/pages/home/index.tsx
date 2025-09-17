import { Tabs } from "antd";
import { recordMenuItems } from "src/constants/menuItems";
import { Card } from "src/lib/common/Cards/Card";
import { Column } from "src/lib/common/Containers/Flex";
import Page from "src/lib/components/Page";
import RecordTable from "src/lib/tables/RecordList";
import { VideoEditor } from "./_content/videoEditor";

const HomePage = () => {
  return (
    <Page>
      <Column>
        <Card>
          <Tabs
            items={recordMenuItems as any}
            style={{ marginTop: -12, marginBlock: -12, width: "100%" }}
          />
          <VideoEditor />
          <RecordTable />
        </Card>
      </Column>
    </Page>
  );
};

export const Component = HomePage;
