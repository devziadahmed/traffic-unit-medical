import React, { useState } from "react";
import { useRef } from "react";
import Tesseract from "tesseract.js";

const name = "زياد احمد عبد التواب اسماعيل";

function ImageUploader({ nameExist, setNameExist, holder, setHolder }) {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setProcessing(true);
      Tesseract.recognize(reader.result, "ara+eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          // Check if the text contains "ziad"
          if (
            text.includes(name[0]) &&
            text.includes(name[1]) &&
            text.includes(name[2]) &&
            text.includes(name[3])
          ) {
            setNameExist(true);
            setHolder(reader.result);
          } else {
            setNameExist(false);
          }
          setProcessing(false);
        }
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-20 pr-20" dir="rtl">
      <div className="mb-20">
        <h2 className="text-xl bg-blue-600 w-fit p-2 text-white font-semibold rounded-lg mb-4 ">
          البطاقة الشخصية
        </h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {/* Show "جاري التحقق" while processing */}
        {/* {processing && <div className="mt-4">جاري التحقق...</div>} */}
        <div
          className="bg-stone-200"
          style={{
            width: "400px",
            height: "250px",
            border: "2px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image ? (
            <img src={image} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          ) : holder ? (
            <img src={holder} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

        {nameExist === true ? (
          <strong className="mt-4 block bg-green-700 w-fit p-2 rounded-lg text-white">
            تم التحقق - البيانات متطابقة ✅
          </strong>
        ) : nameExist === "" ? (
          <strong className="mt-4 block bg-stone-400 w-fit p-2 rounded-lg text-white">
            {nameExist === "" && processing ? "جاري التحقق" : "لا يوجد صورة"}
          </strong>
        ) : (
          <strong className="mt-4 block bg-red-700 w-fit p-2 rounded-lg text-white">
            لم يتم التحقق - البيانات غير متطابقة ❌
          </strong>
        )}
      </div>

      <div>
        <h2 className="text-xl bg-blue-600 w-fit p-2 text-white font-semibold rounded-lg mb-4">
          فحص الدم
        </h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div
          className="bg-stone-200"
          style={{
            width: "400px",
            height: "250px",
            border: "2px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No image uploaded
        </div>

        <strong className="mt-4 block bg-stone-400 w-fit p-2 rounded-lg text-white">
          لا يوجد صورة
        </strong>
      </div>
    </div>
  );
}

export default ImageUploader;
