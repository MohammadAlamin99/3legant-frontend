import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface AuthenticationFormProps {
  title: string;
  button: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSwitchToSignUp: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  togglePassword: () => void;
  isPending: boolean;
  data?: {
    status?: "success" | "fail";
    message?: string;
  };
}

export default function AuthenticationForm({
  title,
  button,
  handleSubmit,
  handleSwitchToSignUp,
  email,
  setEmail,
  password,
  setPassword,
  togglePassword,
  showPassword,
  isPending,
  data,
}: AuthenticationFormProps) {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h2 className="text-[40px] font-medium text-[#141718] mb-4 font-poppins">
          {title}
        </h2>
        <div className="mb-8 text-[#6C7275] text-[16px] font-inter font-normal">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToSignUp}
            className="underline text-[#38CB89] cursor-pointer"
          >
            {button}
          </button>
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b font-inter font-normal border-gray-300 focus:outline-none py-3 placeholder-gray-500"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none py-3 placeholder-gray-500 font-inter font-normal"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer font-inter bg-gray-900 text-white py-3 rounded-lg text-center font-medium hover:bg-gray-800 transition disabled:opacity-60"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
        {data?.status === "fail" && (
          <p className="text-red-500 text-sm mt-2 font-inter">
            {data?.message || "Sign in failed. Please try again."}
          </p>
        )}
      </form>
    </>
  );
}
