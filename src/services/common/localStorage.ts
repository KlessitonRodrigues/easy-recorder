export const saveStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const readStorage = (key: string): string => {
  try {
    return localStorage.getItem(key) || "";
  } catch (error) {
    console.error("Error getting from localStorage", error);
    return "";
  }
};
