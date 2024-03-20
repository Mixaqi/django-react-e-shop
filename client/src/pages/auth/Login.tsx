import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "./login.interface";
import { closeModal } from "../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useLoginUserMutation } from "../../app/api/authApi";
import { setUser, IUser } from "../../store/slices/authSlice";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [
    loginUser,
    {
      data: loginMutationResult,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const handleLogin = async (formData: LoginFormData) => {
    const { email, password } = formData;
    if (email && password) {
      await loginUser({ email, password });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await handleLogin(data);
      console.log("Login success:", loginMutationResult); // Проверка успешного логина в консоли
      if (isLoginSuccess && loginMutationResult) {
        console.log("Dispatching setUser"); // Проверка перед вызовом dispatch

        dispatch(closeModal());
        reset();
      } else {
        console.log("Login failed:", loginError); // Проверка ошибки логина в консоли
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
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
        <div className="mb-3">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            className="form-control"
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
