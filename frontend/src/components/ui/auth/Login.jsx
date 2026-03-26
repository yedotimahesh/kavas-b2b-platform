"use client";
import Image from "next/image";
import { X } from "lucide-react";

const Login = ({ open, setOpen, setMode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-md bg-white relative rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} >
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
        <div className="flex justify-center sm:justify-start mb-2">
          <Image src="/KAVASlogo.png" alt="Kavas Logo" width={120} height={60} className="h-12 sm:h-14 w-auto object-contain" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold">Welcome back</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Sign in to your Kavas account</p>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs sm:text-sm font-medium">Email / Vendor ID</label>
            <input type="email" placeholder="you@company.com" className="w-full mt-0.5 px-3 py-1.5 sm:py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"/>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium">Password</label>
            <input type="password" placeholder="Enter password" className="w-full mt-0.5 px-3 py-1.5 sm:py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"/>
          </div>
          <div className="text-right">
            <span className="text-xs sm:text-sm text-orange-500 hover:underline">Forgot password?</span>
          </div>
          <button type="submit" className="w-full py-1.5 sm:py-2 text-sm font-semibold text-white rounded-md bg-orange-500 hover:bg-orange-600">Sign in to Kavas</button>
        </form>
        <div className="flex items-center my-3 sm:my-4">
          <div className="flex grow h-px bg-gray-200" />
          <span className="mx-2 text-xs sm:text-sm text-gray-400">or</span>
          <div className="flex grow h-px bg-gray-200" />
        </div>
        <button className="w-full border py-1.5 sm:py-2 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50">Continue with Google</button>
        <p className="text-xs sm:text-sm text-center mt-3 sm:mt-4 text-gray-500">
          New?{" "} <span onClick={() => setMode("register")} className="text-blue-600 font-medium hover:underline cursor-pointer">Create your account →</span>
        </p>
      </div>
    </div>
  );
};

export default Login;