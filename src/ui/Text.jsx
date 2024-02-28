import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

const ImageTextReader = () => {
  const [imageText, setImageText] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = new Uint8Array(reader.result);
      const result = await Tesseract.recognize(
        imageData,
        "ara+eng", // language for OCR
        { logger: (m) => console.log(m) } // logger for Tesseract.js
      );
      setImageText(result.data.text);

      if (result.data.text.includes("خالد")) {
        console.log(true);
      } else console.log(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select image</p>
        )}
      </div>
      {imageText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{imageText}</p>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default ImageTextReader;
