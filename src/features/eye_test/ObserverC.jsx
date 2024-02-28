import React, { useRef, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const ObserverC = ({ leftEyeClosed, setLeftEyeClosed, rightEyeClosed, setRightEyeClosed }) => {
  const URL = "https://teachablemachine.withgoogle.com/models/i2Ri010Xp/";
  let model, webcam, labelContainer, maxPredictions;

  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      console.log(maxPredictions[1]);

      const flip = true;
      webcam = new tmImage.Webcam(200, 200, flip);
      await webcam.setup();
      await webcam.play();
      window.requestAnimationFrame(loop);

      document.getElementById("webcam-container").appendChild(webcam.canvas);
      labelContainer = labelContainerRef.current;
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
      }
    };

    const loop = async () => {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      const prediction = await model.predict(webcam.canvas);
      for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
      }

      const leftEyeProbability = prediction[1].probability.toFixed(2);
      const rightEyeProbability = prediction[2].probability.toFixed(2);
      setLeftEyeClosed(leftEyeProbability > 0.4);
      setRightEyeClosed(rightEyeProbability > 0.4);
    };

    init();

    return () => {
      if (webcam) webcam.stop();
    };
  }, []);

  return (
    <div className="absolute top-20 right-8">
      <div id="webcam-container" ref={webcamRef}></div>
      <div id="label-container" ref={labelContainerRef}></div>
    </div>
  );
};

export default ObserverC;
