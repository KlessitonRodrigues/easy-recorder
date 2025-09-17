import { twMerge } from "tailwind-merge";

type IText = React.HTMLAttributes<HTMLParagraphElement> & {
  color?: "red" | "blue" | "green" | "purple" | "yellow" | "gray";
  opacity?: "90" | "80" | "70" | "60" | "50" | "40" | "30" | "20" | "10";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  font?: "bold" | "normal" | "medium";
};

const Paragraph = (props: IText) => {
  const { className, opacity, size = "bold", color = "gray", font } = props;

  return (
    <p
      {...props}
      className={twMerge(`font-roboto text-${size} opacity-${opacity}
        text-${color}-700 font-${font} ${className}`)}
    />
  );
};

export default Paragraph;

/*  tailwindcss include:
    text-blue-700 text-red-700 text-green-700 text-purple-700 text-yellow-700 text-gray-700
    opacity-90 opacity-80 opacity-70 opacity-60 opacity-50 opacity-40 opacity-30 opacity-20 opacity-10
    text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl
    font-bold font-normal font-medium
*/
