import { PropsWithChildren, useEffect } from "react";
import {
  DefaultPage,
  PageContent,
  PageHeader,
} from "src/lib/common/Containers/Pages";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "src/services/common/toast";

const Page = (props: PropsWithChildren) => {
  const { children } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DefaultPage>
      <Toaster toastOptions={toastOptions} />
      <PageHeader>
        <Header />
      </PageHeader>
      <PageContent>{children}</PageContent>
    </DefaultPage>
  );
};

export default Page;
