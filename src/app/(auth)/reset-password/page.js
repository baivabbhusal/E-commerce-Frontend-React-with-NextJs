"use client";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PasswordInput from "../_component/PasswordInput";
import { resetPassword } from "@/api/auth";
import { LOGIN_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { useState, Suspense } from "react";
import Button from "@/components/Button";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    if (!token) {
      toast.error("Invalid or missing reset token. Please request a new link.", {
        autoClose: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      await resetPassword({ token, userId, password: data.password });
      toast.success("Password reset successfully! You can now log in.", {
        autoClose: 2000,
      });
      setTimeout(() => router.push(LOGIN_ROUTE), 2000);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. The link may have expired.";
      toast.error(message, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="p-2 space-y-4 md:space-y-6 sm:p-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Invalid Reset Link
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="block text-sm font-medium text-primary hover:underline dark:text-primary-500"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4 md:space-y-6 sm:p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">
        Reset Password
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Enter your new password below.
      </p>

      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(submitForm)}
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <PasswordInput
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm New Password
          </label>
          <PasswordInput
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match.",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button loading={loading} label={"Reset Password"} />

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          <Link
            href={LOGIN_ROUTE}
            className="font-medium text-primary hover:underline dark:text-primary-500"
          >
            &larr; Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const ResetPasswordPage = () => (
  <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading...</div>}>
    <ResetPasswordForm />
  </Suspense>
);

export default ResetPasswordPage;
