"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const SignUpUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    setIsLoading(true);
    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }
    if (!/\d/.test(password)) {
      setError("    Password must contain at least one number");
      setIsLoading(false)
      return;
    }
    if (password !== confirmPass) {
      setError("Password does not match Confirm Password");
      setIsLoading(false)
      return;
    }
   
    const res = await axios.post(
      "https://simpleauth-yxtw.onrender.com/user/signup",
      {
        email: email,
        password: password,
        confirmPass: confirmPass,
      }
    );
    if (res.status === 200) {
      router.push("/login");
      setIsLoading(false);
    }
    
  };

  return (
    <section className="  bg-gray-900 h-screen justify-center items-center flex">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-[50%]  bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 max-med:w-[90%]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={SignUpUser}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@gmail.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg f block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white  bg-blue-700 transition-all focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center border "
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium dark:text-white text-black hover:underline  "
                >
                  Login
                </a>
              </p>
              <div className="text-red-600 text-md w-full">
                {isloading && (
                  <div>
                    <Loader /> 
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
