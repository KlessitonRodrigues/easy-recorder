import { twMerge } from "tailwind-merge";

type IText = React.HTMLAttributes<HTMLParagraphElement> & {
  color?: "red" | "blue" | "green" | "purple" | "yellow" | "gray";
  opacity?: ".9" | ".8" | ".7" | ".6" | ".5" | ".4" | ".3" | ".2" | ".1";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  font?: "bold" | "normal" | "medium";
};

const Text = (props: IText) => {
  const { className, opacity, size = "base", color = "gray", font } = props;

  return (
    <p
      {...props}
      style={{ opacity }}
      className={twMerge(`font-roboto 
        text-${size} text-${color}-700 font-${font} ${className}`)}
    />
  );
};

export default Text;

/*  tailwindcss include:
    text-blue-700 text-red-700 text-green-700 text-purple-700 text-yellow-700 text-gray-700
    text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl
    font-bold font-normal font-medium
*/
