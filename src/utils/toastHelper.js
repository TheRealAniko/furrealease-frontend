import { toast } from "react-toastify";

export const toastSuccess = (msg) => {
    toast.dismiss(); // vermeidet stacking
    toast.success(msg);
};

export const toastError = (msg) => {
    toast.dismiss();
    toast.error(msg || "Something went wrong");
};
