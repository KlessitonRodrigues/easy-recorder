type IIf = {
  check: boolean;
  true?: React.ReactNode;
  false?: React.ReactNode;
  children?: React.ReactNode;
};

const If = (props: IIf) => {
  return props.check ? props.true || props.children : props.false;
};

export default If;
