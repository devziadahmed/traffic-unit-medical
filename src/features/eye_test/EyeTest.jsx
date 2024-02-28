import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Observer from "./Observer";
import ObserverC from "./ObserverC";

const directions = {
  TOP: "rotate(0deg)",
  TOPRIGHT: "rotate(45deg)",
  BOTTOMRIGHT: "rotate(135deg)",
  BOTTOM: "rotate(180deg)",
  BOTTOMLEFT: "rotate(225deg)",
  LEFT: "rotate(270deg)",
  TOPLEFT: "rotate(315deg)",
};

const widths = ["25px", "15px", "12px", "10px", "8px", "6px"];

function generateDirections() {
  const directionKeys = Object.keys(directions);
  const randomIndex = Math.floor(Math.random() * directionKeys.length);
  const randomDirection = directionKeys[randomIndex];
  return randomDirection;
}

function generateDifficulty() {
  const randomIndex = Math.floor(Math.random() * widths.length);
  const randomWidth = widths[randomIndex];
  return randomWidth;
}

function EyeTest({ eyeTestDone, setEyeTestDone }) {
  const [currentDir, setCurrentDir] = useState("");
  const [currentWidth, setCurrentWidth] = useState("");
  const [mistakeCount, setMistakeCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [emoji, setEmoji] = useState("");

  const [leftEyeClosed, setLeftEyeClosed] = useState(true);
  const [rightEyeClosed, setRightEyeClosed] = useState(true);

  const [currentEye, setCurrentEye] = useState("left");

  useEffect(() => {
    const initDir = generateDirections();
    const initWidth = generateDifficulty();
    setCurrentDir(initDir);
    setCurrentWidth(initWidth);
  }, []);

  useEffect(() => {
    if (correctCount === 10) setEyeTestDone(true);
    else if (correctCount < 5) setCurrentEye("right");
    else setCurrentEye("left");
  }, [correctCount]);

  function handleClick(e) {
    if (e.target.id === currentDir) {
      e.target.style.opacity = 0;
      e.target.style.transitionDuration = "1s";
      setEmoji("✅");
      setCorrectCount((currCount) => currCount + 1);
    } else {
      setEmoji("❌");
      setMistakeCount((currCount) => currCount + 1);
    }

    setTimeout(() => {
      const newDir = generateDirections();
      const newWidth = generateDifficulty();
      setCurrentDir(newDir);
      setCurrentWidth(newWidth);
      setEmoji("");
      e.target.style.opacity = 1;
    }, 1200);
  }

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center h-[100%] relative">
      <p className="absolute top-14 font-bold text-lg text-blue-600" dir="rtl">
        اختبار العين {currentEye}
      </p>

      {/* <Observer
        leftEyeClosed={leftEyeClosed}
        setLeftEyeClosed={setLeftEyeClosed}
        rightEyeClosed={rightEyeClosed}
        setRightEyeClosed={setRightEyeClosed}
      /> */}

      <ObserverC
        leftEyeClosed={leftEyeClosed}
        setLeftEyeClosed={setLeftEyeClosed}
        rightEyeClosed={rightEyeClosed}
        setRightEyeClosed={setRightEyeClosed}
      />

      <span className="absolute top-8 right-8 font-semibold text-red-600 text-xl">
        معدل الاخطاء: 3/{mistakeCount}
      </span>

      <span className="absolute top-8 left-8 font-semibold text-green-600 text-xl">
        10/{correctCount} : المحاولات الناجحة
      </span>

      <div className="w-[400px] h-[550px] shadow-xl shadow-blue-300 ring flex justify-center items-center flex-col-reverse gap-20 relative">
        {!leftEyeClosed && currentEye === "left" && (
          <div className="absolute inset-0 bg-red-600 z-10 flex justify-center items-center">
            <div className="space-y-4 bg-white px-4 py-8 rounded-lg">
              <p className="text-lg font-semibold text-red-600">اغلق عينك اليسري من فضلك</p>
            </div>
          </div>
        )}

        {!rightEyeClosed && currentEye === "right" && (
          <div className="absolute inset-0 bg-red-600 z-10 flex justify-center items-center">
            <div className="space-y-4 bg-white px-4 py-8 rounded-lg">
              <p className="text-lg font-semibold text-red-600">اغلق عينك اليمني من فضلك</p>
            </div>
          </div>
        )}

        {eyeTestDone && (
          <div className="absolute inset-0 bg-green-600 z-10 flex justify-center items-center">
            <div className="space-y-4 bg-white px-4 py-8 rounded-lg">
              <p className="text-lg font-semibold text-green-600">📌 تم اجتياز الاختبار</p>
              <Link
                to="/home/result"
                className="block py-[10px] px-[15px] bg-custom-blue text-white rounded-full font-semibold hover:opacity-90"
              >
                اذهب للصفحة النتائج
              </Link>
            </div>
          </div>
        )}

        {mistakeCount === 3 && (
          <div className="absolute inset-0 bg-red-400 z-10 flex justify-center items-center">
            <div className="space-y-4 bg-white px-4 py-8 rounded-lg">
              <p className="text-lg font-semibold text-red-600">❌ لم يتم تجاوز الاختبار</p>
              <button
                onClick={() => setMistakeCount(0)}
                className="block py-[10px] px-[15px] bg-custom-blue text-white rounded-full font-semibold hover:opacity-90"
              >
                حاول مرة اخري
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-[54%] text-3xl">{emoji}</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="260.002"
          height="260.002"
          className="controls ng-tns-c2867240640-165 ng-trigger ng-trigger-controlAnimations cursor-pointer"
          style={{ fill: "rgb(0, 0, 0)", opacity: 1 }}
        >
          <path
            className="p1 ng-tns-c2867240640-165 ng-trigger ng-trigger-sliceAnimation"
            id="TOP"
            d="M158.934 57.545a77.47 77.47 0 00-13.211-3.957 78.642 78.642 0 00-31.437 0 77.47 77.47 0 00-13.211 3.957l-19.9-48.059a130.162 130.162 0 0197.674 0z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="TOPRIGHT"
            d="M201.693 99.226a78.216 78.216 0 00-40.914-40.914l19.906-48.059a130.414 130.414 0 0169.066 69.066l-48.059 19.907z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="RIGHT"
            d="M202.459 158.933a77.41 77.41 0 003.959-13.213 78.785 78.785 0 000-31.437 77.477 77.477 0 00-3.957-13.209l48.057-19.9a129.319 129.319 0 016.844 22.635 130.2 130.2 0 01-6.844 75.036z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="BOTTOMRIGHT"
            d="M160.779 201.692a78.193 78.193 0 0024.379-16.535 78.8 78.8 0 009.525-11.545 77.993 77.993 0 007.008-12.833l48.061 19.907a130.393 130.393 0 01-69.068 69.064z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="BOTTOM"
            d="M130 260.001a130.826 130.826 0 01-26.2-2.641 129.332 129.332 0 01-22.639-6.846l19.906-48.058a77.615 77.615 0 0013.213 3.957 78.642 78.642 0 0031.438 0 77.47 77.47 0 0013.211-3.957l19.906 48.058a129.181 129.181 0 01-22.639 6.846A130.778 130.778 0 01130 260.001z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="BOTTOMLEFT"
            d="M79.316 249.75a130.42 130.42 0 01-69.066-69.063l48.057-19.9a78.285 78.285 0 0028.084 33.9 77.645 77.645 0 0012.836 7.015z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="LEFT"
            d="M9.486 178.84a130.148 130.148 0 010-97.673l48.055 19.9a78.1 78.1 0 000 57.865z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
          <path
            id="TOPLEFT"
            d="M10.252 79.316a130.414 130.414 0 0169.064-69.064l19.908 48.059a77.664 77.664 0 00-12.834 7.014 78.166 78.166 0 00-28.084 33.9z"
            tabIndex={0}
            style={{ opacity: 1 }}
            onClick={(e) => handleClick(e)}
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit={2}
          clipRule="evenodd"
          viewBox="0 0 3 3"
          alt="landolt ring"
          className="ng-tns-c1665073966-184 ng-trigger ng-trigger-landoltCAnimation"
          style={{
            width: `${currentWidth}`,
            transform: `${directions[currentDir]}`,
            opacity: 1,
          }}
        >
          <path
            d="M1.785,0.015c0.684,0.139 1.2,0.745 1.2,1.47c0,0.828 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.672 -1.5,-1.5c0,-0.725 0.516,-1.331 1.2,-1.47l0,0.69c-0.321,0.119 -0.55,0.424 -0.55,0.78c0,0.46 0.381,0.833 0.85,0.833c0.469,0 0.85,-0.373 0.85,-0.833c0,-0.356 -0.229,-0.661 -0.55,-0.78l0,-0.69Z"
            className="ng-tns-c1665073966-184"
          />
        </svg>
      </div>
    </div>
  );
}

export default EyeTest;
