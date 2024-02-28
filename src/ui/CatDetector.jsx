// import React, { useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// const CatDetector = () => {
//   const [model, setModel] = useState(null);
//   const [result, setResult] = useState("");

//   // Load the model once the component mounts
//   useEffect(() => {
//     async function loadModel() {
//       try {
//         const loadedModel = await mobilenet.load();
//         setModel(loadedModel);
//       } catch (error) {
//         console.error("Error loading model:", error);
//       }
//     }
//     loadModel();
//   }, []);

//   // Function to handle image upload and prediction
//   const handleImageUpload = async (event) => {
//     console.log("Handling image upload...");
//     const imageFile = event.target.files[0];
//     const img = document.createElement("img");
//     img.src = URL.createObjectURL(imageFile);

//     img.onload = async () => {
//       console.log("Image loaded");
//       // Check if model is loaded before using it
//       if (model) {
//         console.log("Model is loaded");
//         const predictions = await model.classify(img);
//         const isCat = predictions.some((prediction) => prediction.className.includes("cat"));
//         setResult(isCat ? "This is a cat!" : "This is not a cat.");
//       } else {
//         console.error("Model is not loaded yet");
//       }
//     };
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <div>{result}</div>
//     </div>
//   );
// };

// export default CatDetector;
