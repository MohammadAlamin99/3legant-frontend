"use client";
import { userSignUp } from "@/actions/user.action";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

const SignUpModal = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const { mutate, isPending, isError, isSuccess, data } = useMutation({
    mutationFn: () => userSignUp(email, password),
    onSuccess: (data) => {
      if (data?.status === "success" && data?.token) {
        localStorage.setItem("token", data.token);
        onClose();
      }
    },
    onError: (err) => {
      console.error("Signup failed:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out all fields!");
      return;
    }
    mutate();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4
        bg-black/0 transition-opacity duration-300
        ${isVisible ? "bg-black/50 opacity-100" : "opacity-0"}
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-xl max-w-4xl w-full p-6 relative transform transition-transform duration-300
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Signup content */}
        <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[500px]">
          {/* Left Side Image */}
          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center relative p-4">
            <h4 className="absolute top-8 left-1/2 -translate-x-1/2 text-black text-xl font-semibold">
              3legant.
            </h4>
            {/* <img
              src="https://res.cloudinary.com/dankquy0f/image/upload/v1736502598/freepik_br_60a78106-e398-4b7a-8ef9-c48decf049ca_pn3tlf.png"
              alt="Signup Illustration"
              className="w-96 h-auto object-cover"
            /> */}
          </div>

          {/* Right Side Form */}
          <div className="lg:w-1/2 flex items-center justify-center px-8 sm:px-6 py-8 lg:py-0">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <h2 className="text-[40px] font-medium text-[#141718] mb-4 font-poppins">
                Sign up
              </h2>
              <p className="mb-8 text-[#6C7275] text-[16px] font-inter font-normal">
                Already have an account?{" "}
                <a href="/signin" className="underline text-[#38CB89]">
                  Sign in
                </a>
              </p>

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b font-inter font-normal border-gray-300 focus:outline-none py-3 placeholder-gray-500"
              />

              {/* Password field */}
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
                {isPending ? "Signing Up..." : "Sign Up"}
              </button>

              {isError && (
                <p className="text-red-500 text-sm mt-2">
                  Signup failed. Please try again.
                </p>
              )}
              {isSuccess && data?.status === "success" && (
                <p className="text-green-500 text-sm mt-2">
                  Signup successful! Token saved.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
