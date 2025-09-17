import enContent from "src/public/i18n/en.json";
import ptContent from "src/public/i18n/pt.json";
import { getLanguage } from "src/services/language";

type ContentType = typeof enContent;

type IText = {
  path: keyof ContentType;
};

const language = getLanguage();
const content = (language === "pt" ? ptContent : enContent) as ContentType;

export const getText = (path: keyof ContentType) => {
  return content[path] || `NO_TEXT_${path}`;
};

export const Text = (props: IText) => {
  const { path } = props;
  return getText(path);
};

export default Text;
