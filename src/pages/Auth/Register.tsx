import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdAlternateEmail, MdPhoneIphone } from "react-icons/md";
import { CgNametag } from "react-icons/cg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { registerUser } from "utils/api.method";
import { NewUserRequest } from "Interfaces/auth.api";
import VerifyEmail from "components/alert/VerifyEmail";

interface RegisterProps {
  setActiveTab: (arg: "login" | "register") => void;
}

const Register: React.FC<RegisterProps> = ({ setActiveTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<NewUserRequest>();
  const [isVerifyModel, setIsVerifyModel] = React.useState<boolean>(false);
  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const onSubmit = async (data: NewUserRequest) => {
    try {
      const res = await registerUser(data);
      if (res.status) {
        toast.success("User created successfully!!");
        setIsVerifyModel(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response.data.message || "Something went wrong");
    }
  };

  const toggleModal = () => {
    setIsVerifyModel(!isVerifyModel);
  };

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  const inputClassName = `w-full rounded-lg border border-gray-400 p-4 pe-12 text-sm shadow-sm`;

  return (
    <div>
      <VerifyEmail
        isOpen={isVerifyModel}
        toggleModel={toggleModal}
        email={getValues("email")}
      />
      <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 mt-5 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg font-medium">
              Sign Up to your account
            </p>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`${inputClassName}`}
                  placeholder="Enter name"
                  {...register("name", { required: true })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <CgNametag />
                </span>
              </div>
              {errors.name && (
                <div className="text-sm text-red-600">Name is required</div>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={`${inputClassName}`}
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdAlternateEmail />
                </span>
              </div>
              {errors.email && (
                <div className="text-sm text-red-600">Email is required</div>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  className={`${inputClassName}`}
                  placeholder="Enter phone"
                  {...register("phone", { required: true })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdPhoneIphone />
                </span>
              </div>
              {errors.phone && (
                <div className="text-sm text-red-600">Phone is required</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPassword ? "password" : "text"}
                  className={`${inputClassName}`}
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                  onClick={togglePassword}
                >
                  {isPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <div className="text-sm text-red-600">Password is required</div>
              )}
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>
            <p
              className="text-center text-sm text-gray-500 cursor-pointer"
              onClick={() => setActiveTab("login")}
            >
              Already have any account?
              <small className="underline">Sign In</small>
            </p>
            <button onClick={toggleModal} type="button">
              toggle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
