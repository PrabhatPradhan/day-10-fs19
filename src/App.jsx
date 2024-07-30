import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify({ inputs: data }), // Ensure the data format is correct
        }
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  }

  return (
    <>
      <div className='flex justify-center items-center flex-col h-[300px] gap-8'>
        <h1 className='text-5xl text-red-500'>Image Generation App</h1>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className='border border-black w-[400px] h-[30px] px-3 text-red-400'
        />
        <button
          onClick={() => query(text)}
          className="bg-red-400 py-2 px-6 font-medium w-44 hover:bg-red-300 hover:text-white"
        >
          Generate
        </button>
      </div>
      <div className=' flex justify-center items-center'>
        {image && <img className='h-[500px] w-[500px]' src={image} alt="Generated" />}
      </div>
    </>
  );
}

export default App;
