import { useEffect, useState } from "react";
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

const useAsyncMutaltion = (mutationHook: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage: any, ...arg: any) => {
        setIsLoading(true);

        const toastId = toast.loading(toastMessage || "Updating Data...");

        try {
            const res: any = await mutate(...arg);

            console.log(res);

            if (res?.data) {
                toast.success(
                    res?.data?.message || "Updated Data successfully"
                );

                setData(res?.data);
                // setIsLoading(false);
            } else {
                toast.error(
                    res?.error?.data?.message || "Something went wrong"
                );
                // setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", { toastId });
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return [executeMutation, isLoading, data] as const;
};

export { useErrors, useAsyncMutaltion };
