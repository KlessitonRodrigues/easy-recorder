import toast, { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  duration: 10000,
  style: {
    minWidth: "20em",
    borderRadius: 16,
    fontSize: 16,
    boxShadow: "1px 2px 4px 0 #0004",
    border: "1px solid #0004",
  },
  error: { style: { color: "#b91c1c" } },
  success: { style: { color: "#4d7c0f" } },
  loading: { style: { color: "#1d4ed8" } },
};

const toastAlert = async <T>(cb: Promise<T>, msg: string, doneMsg: string) => {
  const id = "REQUEST";
  toast.loading(msg, { id });
  try {
    const res = await cb;
    if (doneMsg) toast.success(doneMsg, { id });
    else toast.dismiss(id);
    return res;
  } catch (error: any) {
    toast.error(error.message, { id });
    return Promise.reject(error);
  }
};

export const saveAlert = async (cb: Promise<any>) => {
  return toastAlert(cb, "Salvando ...", "Salvo com sucesso!");
};

export const loadAlert = async <T>(cb: Promise<T>) => {
  return toastAlert(cb, "Carregando ...", "");
};

export const removeAlert = async (cb: Promise<any>) => {
  return toastAlert(cb, "Removendo...", "Removido com sucesso!");
};
