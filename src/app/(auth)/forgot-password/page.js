"use client";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/constants/regex";
import Link from "next/link";
import { LOGIN_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";
import { forgotPassword } from "@/api/auth";
import { useState } from "react";
import Button from "@/components/Button";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    try {
      setLoading(true);
      await forgotPassword({ email: data.email });
      setSubmitted(true);
      toast.success("Password reset link sent! Check your inbox.", {
        autoClose: 3000,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-2 space-y-4 md:space-y-6 sm:p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">
        Forgot Password?
      </h1>

      {submitted ? (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {getValues("email")}
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary font-medium hover:underline"
            >
              try again
            </button>
            .
          </p>
          <Link
            href={LOGIN_ROUTE}
            className="block text-sm font-medium text-primary hover:underline dark:text-primary-500"
          >
            &larr; Back to Login
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(submitForm)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button loading={loading} label={"Send Reset Link"} />

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Remember your password?{" "}
              <Link
                href={LOGIN_ROUTE}
                className="font-medium text-primary hover:underline dark:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
