import { twMerge } from "tailwind-merge";

type ITitle = React.HTMLAttributes<HTMLHeadingElement> & {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "red" | "blue" | "green" | "purple" | "yellow" | "gray";
  opacity?: "90" | "80" | "70" | "60" | "50" | "40" | "30" | "20" | "10";
  font?: "bold" | "normal" | "medium";
  flex?: boolean;
};

const Title = (props: ITitle) => {
  const {
    className,
    tag = "h1",
    opacity,
    color,
    font = "bold",
    flex = false,
  } = props;
  const communStyle = `font-roboto opacity-${opacity} text-${color}-700 font-${font}
    ${flex ? "flex flex-row item-certer gap-2" : ""} ${className}`;

  if (tag === "h1") {
    return <h1 {...props} className={twMerge(`text-3xl ${communStyle}`)} />;
  }
  if (tag === "h2") {
    return <h2 {...props} className={twMerge(`text-2xl ${communStyle}`)} />;
  }
  if (tag === "h3") {
    return <h3 {...props} className={twMerge(`text-xl ${communStyle}`)} />;
  }
  if (tag === "h4") {
    return <h4 {...props} className={twMerge(`text-lg ${communStyle}`)} />;
  }
  if (tag === "h5") {
    return <h5 {...props} className={twMerge(`text-base ${communStyle}`)} />;
  }
  if (tag === "h6") {
    return <h6 {...props} className={twMerge(`text-sm ${communStyle}`)} />;
  }
};

export default Title;

/*  tailwindcss include:
    text-blue-700 text-red-700 text-green-700 text-purple-700 text-yellow-700 text-gray-700
    opacity-90 opacity-80 opacity-70 opacity-60 opacity-50 opacity-40 opacity-30 opacity-20 opacity-10
    text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl
    font-bold font-normal font-medium
    flex flex-row items-center
*/
