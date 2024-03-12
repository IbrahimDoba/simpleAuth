import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <main>
    <div className="h-screen w-full flex justify-center items-center  bg-[#EEEEEE] text-black">
    <div className="flex flex-col justify-center items-center min-w-[500px]  rounded-xl p-6  max-med:min-w-[300px]">
      <h1 className="text-3xl max-med:text-xl">Welcome! Please Sign Up or Login to continue</h1>
      <div className="flex w-full justify-between items-center mt-5">
        <Link href='/signup'>
        <button className="min-w-[150px] p-2 bg-blue-600 rounded-xl text-white  max-med:min-w-[100px]"> Sign Up</button>
        </Link>
        <Link href='/login'>
        <button className="min-w-[150px] p-2 bg-blue-700 rounded-xl text-white  max-med:min-w-[100px]"> Login</button>
        </Link>
      </div>
    </div>
    </div>
    </main>;
}