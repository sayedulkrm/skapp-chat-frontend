import { useEffect } from "react";
import { toast } from "react-toastify";

interface ErrorObject {
    isError: boolean;
    error: any;
    fallback?: () => void;
}

const useErrors = (errors: ErrorObject[] = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }: ErrorObject) => {
            if (isError) {
                if (fallback) {
                    fallback();
                } else {
                    toast.error(error?.data?.message || "Something went wrong");
                }
            }
        });
    }, []);
};

export { useErrors };
