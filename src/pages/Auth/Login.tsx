import { useCurrentUser } from "context/userContext";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "utils/api.method";

interface LoginState {
  email: string;
  password: string;
}

interface LoginProps {
  setActiveTab: (arg: "login" | "register") => void;
}

const Login: React.FC<LoginProps> = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const { setCurrentUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>();

  const onSubmit = async (data: LoginState) => {
    try {
      const res = await loginUser(data);
      if (res.status) {
        toast.success("user logged-in successfully");
        localStorage.setItem("user", JSON.stringify(res.data.result));
        setCurrentUser(res.data.result);
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response.data.message || "Something went wrong");
    }
  };

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 mt-5 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-400 p-4 pe-12 text-sm shadow-sm"
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
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPassword ? "password" : "text"}
                  className="w-full rounded-lg border border-gray-400 p-4 pe-12 text-sm shadow-sm"
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
              Sign in
            </button>

            <p
              className="text-center text-sm text-gray-500 cursor-pointer"
              onClick={() => setActiveTab("register")}
            >
              No account?
              <small className="underline">Sign up</small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
