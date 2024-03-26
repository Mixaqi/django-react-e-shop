import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "./login.interface";
import { closeModal } from "../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useLoginUserMutation } from "../../app/api/authApi";
import { setUser } from "../../store/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response.access);
      dispatch(setUser({ user: response.user, access: response.access }));
      dispatch(closeModal());
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3 d-flex align-items-center">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="form-control"
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3 d-flex align-items-center">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="form-control"
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button ms-2"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {isError && (
          <div className="alert alert-danger" role="alert">
            Сheck input data
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
