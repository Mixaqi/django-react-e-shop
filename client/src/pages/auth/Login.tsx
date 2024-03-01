import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "./login.interface";
import { loginUser } from "../../utils/axios";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
        await loginUser(data);
        alert('Login succesful')
      } catch (error) {
        console.error('Error:', error);
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
