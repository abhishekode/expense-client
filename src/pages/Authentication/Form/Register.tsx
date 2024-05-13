import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpState } from '../SignUp';
import { useForm } from 'react-hook-form';
import { NewUserRequest } from '@/common/Interfaces/req.interface';
import { toast } from 'react-toastify';
import { AuthAPI } from '@/utils/api.method';
import { FiUser } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { CiUnlock, CiLock } from 'react-icons/ci';
import { MdCall } from 'react-icons/md';

interface RegisterFormProps {
  setRegisterState: (args: SignUpState) => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ setRegisterState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserRequest>();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const onSubmit = async (data: NewUserRequest) => {
    try {
      const res = await AuthAPI.registerUser(data);
      if (res.status) {
        toast.success('User created successfully!!');
        setRegisterState({
          email: data.email,
          isOtpSent: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };
  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
        <span className="mb-1.5 block font-medium">Start for free</span>
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign Up to TailAdmin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                {...register('name', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <FiUser className="text-2xl" />
              </span>
            </div>
            {errors.name && (
              <div className="text-sm text-red-600">Name is required</div>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter your full name"
                {...register('phone', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <MdCall className="text-2xl" />
              </span>
            </div>
            {errors.phone && (
              <div className="text-sm text-red-600">Phone is required</div>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4">
                <TfiEmail className="text-xl" />
              </span>
            </div>
            {errors.email && (
              <div className="text-sm text-red-600">Email is required</div>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={isPassword ? 'password' : 'text'}
                placeholder="Enter your password"
                {...register('password', { required: true })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              <span className="absolute right-4 top-4 cursor-pointer" onClick={togglePassword}>
                {isPassword ? (
                  <CiLock className="text-2xl" />
                ) : (
                  <CiUnlock className="text-2xl" />
                )}
              </span>
            </div>
            {errors.password && (
              <div className="text-sm text-red-600">Password is required</div>
            )}
          </div>
          <div className="mb-5">
            <input
              type="submit"
              value="Create account"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </div>

          <div className="mt-6 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
