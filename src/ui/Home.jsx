import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ eyeTestDone }) {
  return (
    <div className="flex flex-col gap-[104px] mt-10 mr-[20%]" dir="rtl">
      <div className="flex items-center gap-8">
        <span className=" w-20 h-20  rounded-full bg-green-500 text-white font-semibold text-xl flex justify-center items-center relative ring ring-blue-500 before:absolute before:w-1 before:h-[100px] before:top-[101%] before:bg-blue-500">
          1
        </span>
        <p className="text-xl font-bold text-blue-500">- تسجيل الدخول</p>
      </div>

      <div className="flex items-center gap-8">
        <span
          className={` w-20 h-20  rounded-full text-white font-semibold text-xl flex justify-center items-center relative ring ring-blue-500 before:absolute before:w-1 before:h-[100px] before:top-[101%] before:bg-blue-500 bg-blue-500 animate-pulse`}
        >
          2
        </span>
        <p className=" flex flex-col gap-2">
          <Link to={"/home/paper"}>
            <strong className="text-blue-500 text-xl hover:text-green-600">
              إرفاق المستندات المطلوبة
            </strong>
          </Link>
          <span className="text-sm font-semibold">1 - صورة البطاقة الشخصية</span>
          <span className="text-sm font-semibold">2 - تحليل فصيلة الدم</span>
        </p>
      </div>

      <div className="flex items-center gap-8">
        <span
          className={` w-20 h-20  rounded-full text-white font-semibold text-xl flex justify-center items-center relative ring ring-blue-500 before:absolute before:w-1 before:h-[100px] before:top-[101%] before:bg-blue-500 ${
            eyeTestDone ? "bg-green-500" : "animate-pulse bg-blue-500"
          }`}
        >
          3
        </span>
        <p className=" flex flex-col gap-2">
          <Link to="/home/eyetest">
            <strong className="text-blue-500 text-xl hover:text-green-600">
              اختبار النظر وسلامة العين
            </strong>
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-8">
        <span
          className={` w-20 h-20  rounded-full bg-blue-500 text-white font-semibold text-xl flex justify-center items-center relative ring ring-blue-500 animate-pulse`}
        >
          3
        </span>
        <p className=" flex flex-col gap-2">
          <strong className="text-blue-500 text-xl hover:text-green-600">
            اختبار الاطراف والاعاقة
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Home;
