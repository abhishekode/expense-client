import React from "react";
import { useForm } from "react-hook-form";
import AlertModel from "components/common/AlertModel";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { MdAlternateEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { resendVerifyOTP, verifyOTP } from "utils/api.method";

interface VerifyEmailOtpRequest {
  email: string;
  otp: number;
}

interface VerifyEmailProps {
  isOpen: boolean;
  toggleModel: () => void;
  email: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
  const { isOpen, toggleModel, email } = props;
  const [isReSentOtp, setIsReSentOtp] = React.useState<boolean>(false);
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailOtpRequest>();

  const onSubmit = async (data: VerifyEmailOtpRequest) => {
    try {
      setIsVerifying(true);
      const res = await verifyOTP({ email, otp: data.otp });
      if (res.status) {
        toast.success(res.data.message);
        toggleModel();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsReSentOtp(true);
      const res = await resendVerifyOTP(email);
      if (res.status) {
        toast.success(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsReSentOtp(false);
    }
  };

  return (
    <AlertModel isOpen={isOpen} toggleModal={toggleModel}>
      <div className="rounded-lg shadow bg-white">
        <div className="relative w-full max-w-lg h-full">
          <div className="relative w-full py-8">
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={toggleModel}
            >
              <GrClose />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-8">
              <FaPersonCircleQuestion className="mx-auto mb-4 text-gray-700 w-12 h-12" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Please check your mail and verify!
                </h3>
                <div className="relative my-4">
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm border shadow-sm"
                    placeholder="Enter email"
                    disabled
                    value={email}
                    {...register("email")}
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <MdAlternateEmail />
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm border shadow-sm"
                    placeholder="Enter otp"
                    {...register("otp", {
                      required: "OTP is required",
                      minLength: {
                        value: 6,
                        message: "OTP must be at least 6 characters long",
                      },
                    })}
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <MdAlternateEmail />
                  </span>
                </div>
                {errors.otp && (
                  <div className="text-sm text-red-600 pl-2 pt-2">
                    {errors.otp.message}
                  </div>
                )}
                <div className="my-8 text-center">
                  <button
                    className="text-sm capitalize text-blue-400"
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isReSentOtp}
                  >
                    {isReSentOtp ? "sending OTP...." : "Resent OTP"}
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    type="submit"
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Email Verifying..." : "Email Verify"}
                  </button>
                  <button
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={toggleModel}
                  >
                    No, cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AlertModel>
  );
};

export default VerifyEmail;
