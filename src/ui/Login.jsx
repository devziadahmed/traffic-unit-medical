import { useNavigate } from "react-router-dom";
import logo from "../../public/images/logoMain.jpg";
import { Form, redirect } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center h-full mt-20" dir="rtl">
      <div>
        <div className="text-center mb-20 flex flex-col justify-center items-center">
          <img src={logo} alt="" className="max-w-[150px]" />
          <h1 className="text-[32px] text-blue-600 ">الهيئة العامة للمرور</h1>
        </div>

        <h2 className="text-[28px] mb-8 text-center">تسجيل الدخول</h2>
        <form
          method="POST"
          className="w-[600px] h-[300px] border p-4"
          onSubmit={() => navigate("/home/instructions")}
        >
          <div className="flex flex-col mb-6">
            <label htmlFor="" className="mb-2 text-blue-600 font-semibold">
              البريد الالكتروني
            </label>

            <input type="email" name="email" className="border-2 p-2 " required />
          </div>

          <div className="flex flex-col mb-8">
            <label htmlFor="" className="mb-2 text-blue-600 font-semibold">
              كلمة السر
            </label>

            <input type="password" name="password" id="" className="border-2 p-2 " required />
          </div>

          <button className="text-white bg-blue-600 w-full p-4 hover:bg-blue-700">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
