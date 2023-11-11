import React, { useState } from "react";
import ComicDisplay from "./ComicDisplay";

const ComicForm = ({ generateComic }) => {
  const [textInputs, setTextInputs] = useState(Array(10).fill(""));
  const[images, setImages] = useState([]); // [image1, image2, image3, ...]
  const[imageBytes, setImageBytes] = useState([]); // [image1, image2, image3, ...]
  const API_KEY = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM';

  const handleInputChange = (index, value) => {
    const newInputs = [...textInputs];
    newInputs[index] = value;
    setTextInputs(newInputs);
  };

  async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            Accept: "image/png",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
    
      const result = await response.blob();
      const image_url = URL.createObjectURL(result);
      console.log(image_url,'image_url');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with text inputs:", textInputs);
    setImageBytes(query({
        "inputs": "A man with a laptop infront",
    }))
    console.log(query({
        "inputs": "A man with a laptop infront",
    }),'lomsha');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {textInputs.map((text, index) => (
          <div key={index}>
            <label>{`Panel ${index + 1}: `}</label>
            <input
              type="text"
              value={text}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Generate Comic</button>
      </form>
      <div>
        {/* <ComicDisplay images={imageBytes}/> */}
        <img src={imageBytes} />
      </div>
    </div>
  );
};

export default ComicForm;
