import { Column } from "src/lib/common/Containers/Flex";
import Paragraph from "src/lib/common/Text/Paragraph";
import Text from "src/lib/common/Text/Text";
import Title from "src/lib/common/Text/Title";
import Page from "src/lib/components/Page";

const NotFoundPage = () => {
  return (
    <Page>
      <Column className="mt-40">
        <Title color="blue">
          <Text path="404_title" />
        </Title>
        <Paragraph>
          <Text path="404_description" />
        </Paragraph>
      </Column>
    </Page>
  );
};

export const Component = NotFoundPage;
