"use client";
import { userSignUp } from "@/actions/user.action";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";
import AuthenticationForm from "./AuthenticationForm";
import { ToastContainer, toast } from "react-toastify";

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}

export default function SignUpModal({
  onClose,
  onSwitchToSignIn,
}: SignUpModalProps) {
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

  const setSessionCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; SameSite=Lax;`;
  };

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => userSignUp(email, password),
    onSuccess: (data) => {
      if (data?.status === "success" && data?.token) {
        setSessionCookie("token", data.token);
        onClose();
        window.location.reload();
      }
    },
    onError: (err) => {
      console.error("Signup failed:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all fields!");
      return;
    }
    mutate();
  };

  const handleSwitchToSignIn = () => {
    onClose();
    onSwitchToSignIn?.();
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
        <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[500px]">
          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center relative p-4">
            <h4 className="absolute top-8 left-1/2 -translate-x-1/2 text-black text-xl font-semibold">
              3legant.
            </h4>
            <Image
              src="/images/signUp.jpg"
              alt="Signup Illustration"
              fill
              className="w-96 h-auto object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex items-center justify-center px-8 sm:px-6 py-8 lg:py-0">
            <AuthenticationForm
              title="Sign Up"
              button="Sign In"
              handleSubmit={handleSubmit}
              handleSwitchToSignUp={handleSwitchToSignIn}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              togglePassword={togglePassword}
              showPassword={showPassword}
              isPending={isPending}
              data={data}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
