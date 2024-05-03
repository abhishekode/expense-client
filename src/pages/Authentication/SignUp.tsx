import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '@/static/images/logo/logo-dark.svg';
import Logo from '@/static/images/logo/logo.svg';
import PhoneMockUp from '@/static/images/icon/phone-mockup.svg';
import VerifyEmail from './Form/VerifyMail';
import RegisterForm from './Form/Register';

export interface SignUpState {
  email: string;
  isOtpSent: boolean;
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<SignUpState>({
    email: '',
    isOtpSent: false,
  });

  const handleStateChange = (state: SignUpState) => {
    setState((prev) => ({ ...prev, ...state }));
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

          {state.isOtpSent ? (
            <VerifyEmail email={state.email} />
          ) : (
            <RegisterForm setRegisterState={handleStateChange} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
