import { Modal } from "antd";

type IModalProps = {
  title?: string;
  open?: boolean;
  onCancel?: () => void;
  children?: React.ReactNode;
};

export const CenteredModal = (props: IModalProps) => {
  const { title, open, onCancel } = props;

  return (
    <Modal
      width={800}
      destroyOnHidden
      title={title}
      open={open}
      footer={null}
      onCancel={() => onCancel?.()}
    >
      {props.children}
    </Modal>
  );
};
