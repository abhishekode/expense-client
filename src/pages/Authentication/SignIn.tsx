import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneMockUp from '@/static/images/icon/phone-mockup.svg';
import LogoDark from '@/static/images/logo/logo-dark.svg';
import Logo from '@/static/images/logo/logo.svg';
import { TfiEmail } from 'react-icons/tfi';
import { useCurrentUser } from '@/context/userContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { LoginRequest } from '@/common/Interfaces/req.interface';
import { AuthAPI } from '@/utils/api.method';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  React.useEffect(() => {
    if (currentUser && currentUser.token) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await AuthAPI.loginUser(data);
      if (res) {
        toast.success('user logged-in successfully');
        localStorage.setItem('user', JSON.stringify(res.result));
        setCurrentUser(res.result);
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <section className="min-h-screen h-full flex justify-center items-center">
      <div className=" container mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <span className="mt-15 inline-block">
                <img src={PhoneMockUp} alt="" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to RAD Admin
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
                      {...register('email', { required: true })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <TfiEmail />
                    </span>
                  </div>
                  {errors.email && (
                    <div className="text-sm text-red-600">
                      Email is required
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type={isPassword ? 'password' : 'text'}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      {...register('password', { required: true })}
                    />

                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePassword}
                    >
                      {isPassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="text-sm text-red-600">
                      Password is required
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/register" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
