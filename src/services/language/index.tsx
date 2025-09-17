import { readStorage, saveStorage } from "../common/localStorage";

export const getLanguage = (): string => {
  const language = readStorage("language");
  return language ? language : "en";
};

export const setLanguage = (language: string): void => {
  saveStorage("language", language);
  window.location.reload();
};
