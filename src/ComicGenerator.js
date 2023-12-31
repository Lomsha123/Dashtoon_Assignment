import React, { useState, useEffect } from "react";
import "./App.css";
const API_KEY =
  "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

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
  return URL.createObjectURL(result);
}

const ComicGenerator = () => {
  const [panels, setPanels] = useState(Array(10).fill(""));
  const [comicImage, setComicImage] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(false);
//   const [start, setStart] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleTextChange = (index, text) => {
    console.log(panels, "panels");
    // if(text==="") return;
    const newPanels = [...panels];
    // if(newPanels[index]!=="") setStart(index);
    newPanels[index] = text;
    // setStart(index);
    setPanels(newPanels);
  };

  useEffect(() => {}, [comicImage]);

  const generateComic = async () => {
    // const data = { panels };
    const data = [...panels];
    const new_data = [...comicImage];
    setLoading(true);
    try {
      for (let i = 0; i < 10; i++) {
        if (data[i] === "") {
        //   setStart(i);
          continue;
        }
        const imageBlob = await query({ inputs: data[i] });
    
        
        new_data[i] = imageBlob;
        
      }
      setComicImage(new_data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error generating comic:", error);
    }
  };


  const handleUpdate = () => {
    setIsUpdated(!isUpdated);
  }

  return (
    <div>
      <h1>Comic Generator</h1>
      <form>
      <div className="parentPanel">
        {panels.map((text, index) => (
          <div key={index} >
            <label>Panel {index + 1}:</label>
            <input
              id={index}
              type="text"
              value={text}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
          </div>
        ))}
        </div>
      </form>
      <button
        onClick={() => {
          handleUpdate();
          generateComic();
        }}
      >
        Generate Comic
      </button>
      {
        loading?<div>Loading...</div>:<div className="parent_image_container">
      
        {comicImage.map((image, index) => (
          // console.log(image,'image')
          <div className='image_container' key={index}>
            {image && <img className="img" src={image} alt="" />}
          </div>
        ))}
        </div>
      }
      
    </div>
  );
};

export default ComicGenerator;