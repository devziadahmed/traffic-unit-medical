const base = "font-semibold text-md text-white py-[8px] px-[8px] rounded-full w-fit";
const done = base + " bg-green-600";
const unDone = base + " bg-red-600";

function Result({ eyeTestDone, nameExist }) {
  return (
    <div dir="rtl" className="flex flex-col gap-8 mt-20">
      <div className="bg-stone-200 p-4 flex items-center gap-8 rounded-md">
        <p className="font-semibold text-lg text-blue-500">ارفاق المستندات المطلوبة</p>
        <p className={nameExist ? done : unDone}>{nameExist ? "تم بنجاح" : "لم يتم بعد"}</p>
      </div>

      <div className="bg-stone-200 p-4 flex items-center gap-8 rounded-md">
        <p className="font-semibold text-lg text-blue-500">اختبار النظر وسلامة العين</p>
        <p className={eyeTestDone ? done : unDone}>
          {eyeTestDone ? "تم بنجاح" : "لم يتم بعد"}
        </p>
      </div>

      <div className="bg-stone-200 p-4 flex items-center gap-8 rounded-md">
        <p className="font-semibold text-lg text-blue-500">اختبار الاطراف والاعاقة</p>
        <p className={unDone}>لم يتم بعد</p>
      </div>
    </div>
  );
}

export default Result;
