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
  const [error, setError] = useState<boolean>(false);

  const LoginUser = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("https://simpleauth-yxtw.onrender.com/user/login", {
      email: email,
      password: password,
    });
    try {
      if (res) {
        const token = res.data.accessToken;
        // localStorage.setItem("token", token);

        const userEmail = res.data.email;
        login({ email: userEmail });

        router.push("/dashboard");
      } 
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
              console.log(err);
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                className="w-full text-white  border hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium  hover:underline text-white  "
                >
                  Sign up
                </a>
              </p>
              <div className="text-red-600 text-xl w-full">
                {error && <p>There was an Error Please Try Again!</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
