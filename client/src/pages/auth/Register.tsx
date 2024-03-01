import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegistrationFormData } from "./register.interface";
import { registerUser } from "../../utils/axios";

const Register: React.FC = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<RegistrationFormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try{
      await registerUser(data)
      alert('Registration successful')
      reset();
    }catch(error){
      alert('Registration failed. Pls try again')
      console.error(error)
    }
  };

  const passwordMatchValidator = (confirmedPassword: string) => {
    return confirmedPassword === watch("password") || "Passwords should match!";
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
          <input
            {...register("username", {
              required: "Username is required field!"
            })}
            className="form-control"
            placeholder="Username"
          />
          {errors?.username && (
            <div className="text-danger">{errors.username.message}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            {...register("email", {
              required: "Email is required field!",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email",
              },
            })}
            className="form-control"
            placeholder="Email"
          />
          {errors?.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>

        <div className="row g-2">
          <div className="col">
            <input
              {...register("password", {
                required: "Password is required field!",
                pattern: {
                  value: PASSWORD_REGEX,
                  message: "Please enter a valid password",
                },
              })}
              className="form-control"
              type="password"
              placeholder="Password"
            />
            {errors?.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="col">
            <input
              {...register("confirmedPassword", {
                required: "Confirmed password is required field!",
                validate: passwordMatchValidator
              })}
              className="form-control"
              type="password"
              placeholder="Confirmed Password"
            />
            {errors?.confirmedPassword && (
              <div className="text-danger">{errors.confirmedPassword.message}</div>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary mt-3">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
