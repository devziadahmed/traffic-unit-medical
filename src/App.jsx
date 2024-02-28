import { useState } from "react";

import { createBrowserRouter } from "react-router-dom";
import Login from "./ui/Login";
import { RouterProvider } from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./ui/Home";
import Result from "./ui/Result";
// import CatDetector from "./ui/CatDetector";
import EyeTest from "./features/eye_test/EyeTest";
import Test from "./features/eye_test/ObserverC";
import Observer from "./features/eye_test/Observer";
import ObserverC from "./features/eye_test/ObserverC";
import Text from "./ui/Text";
import Paper from "./features/paper/Paper";

function App() {
  const [eyeTestDone, setEyeTestDone] = useState(false);
  const [nameExist, setNameExist] = useState("");
  const [holder, setHolder] = useState("");

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/home",
      element: <Layout />,
      children: [
        { path: "instructions", element: <Home eyeTestDone={eyeTestDone} /> },
        {
          path: "result",
          element: <Result eyeTestDone={eyeTestDone} nameExist={nameExist} />,
        },
        {
          path: "eyetest",
          element: <EyeTest eyeTestDone={eyeTestDone} setEyeTestDone={setEyeTestDone} />,
        },
        {
          path: "paper",
          element: (
            <Paper
              nameExist={nameExist}
              setNameExist={setNameExist}
              holder={holder}
              setHolder={setHolder}
            />
          ),
        },
      ],
    },
    { path: "/test", element: <Text /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
