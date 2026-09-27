"use client";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/constants/regex";
import Link from "next/link";
import { REGISTER_ROUTE, FORGOT_PASSWORD_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";
import PasswordInput from "../_component/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/auth/authActions";
import { useEffect } from "react";
import Button from "@/components/Button";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const dispatch=useDispatch();
    const {error,loading}=useSelector((state)=>state.auth);

  async function submitForm(data) {
    dispatch(loginUser(data));

  }
  useEffect(()=>{
    if(error){
      toast.error(error,{
      autoClose:1000,
      });
    };
  },[error]);

  return (
      <div className="p-2 space-y-4 md:space-y-6 sm:p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">Welcome back!</h1>
        <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white text-center">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitForm)}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" 
    {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address.",
            },
          })}
           id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
           <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <PasswordInput
            id="password"
             {...register("password", {
            required: "Password is required",
            minLength:{
              value:6,
              message:"Password length must be greather than 6."
            }
          })}/>
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <Link href={FORGOT_PASSWORD_ROUTE} className="text-sm font-medium text-primary hover:underline dark:text-primary-500">Forgot password?</Link>
          </div>
          <Button loading={loading} label={"Sign In"}/>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <Link href={REGISTER_ROUTE} className="font-medium text-primary hover:underline dark:text-primary-500">Sign up</Link>
          </p>
        </form>
      </div>

  );
};

export default LoginPage;
