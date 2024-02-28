import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as facemesh from "@tensorflow-models/facemesh";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // Or '@tensorflow/tfjs-backend-cpu' for CPU backend

function Observer({ leftEyeClosed, setLeftEyeClosed, rightEyeClosed, setRightEyeClosed }) {
  // Set the backend
  tf.setBackend("webgl");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh model
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 350, height: 350 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const face = await net.estimateFaces(video);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);

      // Check if eyes are closed
      if (face.length > 0) {
        const leftEye = face[0].annotations.leftEyeUpper0.concat(
          face[0].annotations.leftEyeLower0
        );
        const rightEye = face[0].annotations.rightEyeUpper0.concat(
          face[0].annotations.rightEyeLower0
        );

        const leftEyeClosed = isEyeClosed(leftEye);
        const rightEyeClosed = isEyeClosed(rightEye);

        setLeftEyeClosed(leftEyeClosed);
        setRightEyeClosed(rightEyeClosed);
      }
    }
  };

  const drawMesh = (faces, ctx) => {
    if (faces.length > 0) {
      faces.forEach((face) => {
        const keypoints = face.scaledMesh;

        // Draw keypoints
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i][0];
          const y = keypoints[i][1];

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 3 * Math.PI, true);
          ctx.fillStyle = "red";
          ctx.fill();
        }
      });
    }
  };

  const isEyeClosed = (eyePoints) => {
    // Get top and bottom points of the eye
    const topPoints = eyePoints.slice(0, Math.floor(eyePoints.length / 2));
    const bottomPoints = eyePoints.slice(Math.floor(eyePoints.length / 2));

    // Get the average y-coordinate of top and bottom points
    const topY = topPoints.reduce((acc, curr) => acc + curr[1], 0) / topPoints.length;
    const bottomY = bottomPoints.reduce((acc, curr) => acc + curr[1], 0) / bottomPoints.length;

    // Calculate the distance between top and bottom points
    const eyeHeight = Math.abs(topY - bottomY);

    console.log(eyeHeight);

    // Check if eye is closed based on height
    return eyeHeight < 20; // Adjust threshold as needed
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: "0px",
            right: "0px",
            textAlign: "center",
            zIndex: 9,
            width: 350,
            height: 350,
          }}
          // Mirror the video feed for front-facing camera
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: "0px",
            right: "0px",
            textAlign: "center",
            zIndex: 9,
            width: 350,
            height: 350,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: leftEyeClosed ? "red" : "green",
          }}
        >
          Left Eye: {leftEyeClosed ? "Closed" : "Open"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            color: rightEyeClosed ? "red" : "green",
          }}
        >
          Right Eye: {rightEyeClosed ? "Closed" : "Open"}
        </div>
      </header>
    </div>
  );
}

export default Observer;
