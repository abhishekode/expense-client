import { AuthAPI } from '@/utils/api.method';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TfiEmail } from 'react-icons/tfi';
import { BiDialpad } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface VerifyEmailOtpRequest {
  email: string;
  otp: number;
}

interface VerifyEmailProps {
  email: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
  const { email } = props;
  console.log('props', props)
  const navigate = useNavigate()
  const [isReSentOtp, setIsReSentOtp] = React.useState<boolean>(false);
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailOtpRequest>({
    defaultValues: email ? { email } : {}
  });

  const onSubmit = async (data: VerifyEmailOtpRequest) => {
    try {
      setIsVerifying(true);
      const res = await AuthAPI.verifyOTP({ email, otp: data.otp });
      if (res.status) {
        toast.success(res.message);
        navigate('/auth/login')

      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsReSentOtp(true);
      const res = await AuthAPI.resendVerifyOTP(email);
      if (res.status) {
        toast.success(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsReSentOtp(false);
    }
  };

  return (
    <>
      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="" onClick={()=> }>back</div>
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span className="mb-1.5 block font-medium">Verify your email</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Enter your OTP
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <TfiEmail className="text-xl" />
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter Your OTP
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="123456"
                  {...register('otp', {
                    required: 'OTP is required',
                    minLength: {
                      value: 6,
                      message: 'OTP must be at least 6 characters long',
                    },
                  })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <BiDialpad className='text-2xl' />
                </span>
              </div>
              {errors.otp && (
                <div className="text-sm text-red-600 pl-2 pt-2">
                  {errors.otp.message}
                </div>
              )}
            </div>

            <div className="mb-5 flex gap-4">
              <button
                type="button"
                disabled={isReSentOtp}
                onClick={handleResendOTP}
                className="w-full cursor-pointer rounded-lg border border-primary p-4 text-slate-800 transition hover:bg-opacity-90"
              >
                {isReSentOtp ? 'sending OTP....' : 'Resent OTP'}
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                {isVerifying ? 'Email Verifying...' : 'Email Verify'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
