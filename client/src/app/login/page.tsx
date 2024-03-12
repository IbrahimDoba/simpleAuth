"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "../hooks/userContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);

  const LoginUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }
    if (!/\d/.test(password)) {
      setError("    Password must contain at least one number");
      return;
    }
    const res = await axios.post(
      "https://simpleauth-yxtw.onrender.com/user/login",
      {
        email: email,
        password: password,
      }
    );

    try {
      if (res) {
        const token = res.data.accessToken;
        // localStorage.setItem("token", token);

        const userEmail = res.data.email;
        login({ email: userEmail });
        router.push("/dashboard");
      } else {
        if (res === 400) {
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      if (err.response) {
        setIsLoading(false);
        // The request was made and the server responded with a status code
        console.log(err);
      }
    }
  };
  return (
    <section className="bg-gray-900 h-screen justify-center items-center flex">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto">
        <div className="w-[50%]  bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 max-med:w-[90%]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={LoginUser}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                {/* <a
                  href="/forgot-password"
                  className="text-sm font-medium text-white hover:underline "
                >
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="w-full text-white   bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 text-primary-600 dark:text-primary-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium hover:underline text-black dark:text-white "
                >
                  Sign up
                </a>
              </p>
              <div className="text-red-600 text-md w-full">
                {error && <p>{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
