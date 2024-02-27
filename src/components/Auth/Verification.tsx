import { FC, useRef, useState, useEffect } from "react";

import { toast } from "react-toastify";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { activateUser } from "../../redux/authSlice/authReducers";
import { Link, useNavigate } from "react-router-dom";
import {
    clearAuthError,
    clearAuthMesssage,
} from "../../redux/authSlice/authSlice";

type Props = {};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const Verification: FC<Props> = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { userActivationToken, authError, authMessage } = useAppSelector(
        (state) => state.auth
    );

    const [invalidError, setInvalidError] = useState(false);
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verificationHandler = async () => {
        console.log("Verified", inputRefs);
        const verificationCode = Object.values(verifyNumber).join("");
        if (verificationCode === "" || verificationCode.length !== 4) {
            setInvalidError(true);
            return;
        }

        const data = {
            activation_token: userActivationToken,
            activation_code: verificationCode,
        };

        await dispatch(activateUser(data));
    };

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    useEffect(() => {
        if (authMessage) {
            toast.success(authMessage);
            dispatch(clearAuthMesssage());
            navigate("/login");
        }

        if (authError) {
            toast.error(authError);
            dispatch(clearAuthError());
        }
    }, [authError, authMessage]);

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl md:text-5xl font-semibold mb-4">
                Verification
            </h1>
            <div className="h-20 w-20 rounded-md bg-cyan-600 flex justify-center items-center my-5">
                <VscWorkspaceTrusted className="text-white text-5xl" />
            </div>
            <div className="flex space-x-5 ">
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        key={key}
                        ref={inputRefs[index]}
                        type="number"
                        value={verifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) =>
                            handleInputChange(index, e.target.value)
                        }
                        maxLength={1}
                        className={`w-16 h-16 text-center border rounded-md bg-transparent no-arrow ${
                            invalidError ? "border-red-500" : "border-gray-300"
                        } text-lg font-semibold focus:outline-none focus:border-blue-500`}
                    />
                ))}
            </div>
            {invalidError && (
                <p className="text-red-500 mt-2">
                    Invalid verification code. Please try again.
                </p>
            )}
            <button
                onClick={verificationHandler}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
                Verify
            </button>

            <p className=" text-center mt-5">
                Go Back to{" "}
                <Link to="/login" className="text-blue-500 cursor-pointer">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Verification;
